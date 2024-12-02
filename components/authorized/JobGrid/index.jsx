import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlineEnvironment } from "react-icons/ai";
import { CgBriefcase } from "react-icons/cg";
import Link from "next/link";
import { getJobs, convertTimestamp } from "@/firebaseConfig/talentStore";
import { companyStore } from "../../../firebaseConfig/companyStore";
import LoadingScreen from "@/components/utils/Loaders/Loader";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";

const JobGrid = ({ searchInput }) => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleSort, setToggleSort] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsPage, setDetailsPage] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobsWithCompanyInfo, setJobsWithCompanyInfo] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [filters, setFilters] = useState({
    datePosted: null,
    jobType: null,
  });
  const router = useRouter();
  const jobsPerPage = 6;

  //Display all jobs
  useEffect(() => {
    const fetchJobsAndCompanies = async () => {
      setIsLoading(true); 
      try {
        const jobList = await getJobs();
        
        const jobsWithCompany = await Promise.all(
          jobList.map(async (job) => {
            const companyInfo = await companyStore.getCompanyStoreById(job.companyId);
            return {
              ...job,
              companyInfo: companyInfo || {}
            };
          })
        );
        
        setJobs(jobsWithCompany);
        setFilteredJobs(jobsWithCompany);
      } catch (error) {
        console.error("Error fetching jobs and company info:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchJobsAndCompanies();
  }, []);
  

  useEffect(() => {
    let result = [...jobs];
    if (searchInput && searchInput.trim() !== "") {
      const searchTerm = searchInput.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.location.toLowerCase().includes(searchTerm) ||
          job.jobType.toLowerCase().includes(searchTerm) ||
          job.jobLevel.toLowerCase().includes(searchTerm) ||
          job.companyInfo.fullName.toLowerCase().includes(searchTerm)
      );
    }

    // Date Posted Filter
    if (filters.datePosted) {
      const now = new Date();
      result = result.filter((job) => {
        const jobDate = job.createdAt?.toDate() || new Date(0);
        const daysDiff = (now - jobDate) / (1000 * 60 * 60 * 24);

        switch (filters.datePosted) {
          case "24h":
            return daysDiff <= 1;
          case "7d":
            return daysDiff <= 7;
          case "14d":
            return daysDiff <= 14;
          case "30d":
            return daysDiff <= 30;
          default:
            return true;
        }
      });
    }

    // Job Type Filter
    if (filters.jobType) {
      result = result.filter(
        (job) => job.jobType?.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    setFilteredJobs(result);
    setNoResults(result.length === 0);
    setCurrentPage(1);
  }, [jobs, searchInput, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };
  
  const isFilterToggled = () => {
    setToggleFilter(!toggleFilter);
    setToggleSort(false);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className={` ${styles.job__grid} pt-12 pb-6 bg-white`}>
      <div className="w-[90%] lg:w-[95%] m-auto">
        <div className="mx-auto max-w-xl text-center my-6">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore the latest job openings
          </p>
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">
            Discover jobs most relevant to you
          </h2>
        </div>
        <div className={styles.grid__header}>
          <div className={styles.header__left}>
            <h5 className={styles.total__jobs}>
              Showing{" "}
              <span className={styles.job__number}>
                {jobs.length}
              </span>{" "}
               available jobs
            </h5>
          </div>

          <div className={styles.header__right}>
            <div className={styles.filter}>
              <button
                className={styles.filter__button}
                onClick={isFilterToggled}
              >
                Show Filter
              </button>

              <div
                className={
                  toggleFilter ? styles.show__filter : styles.filter__group
                }
              >
                <div className={styles.filter__item}>
                  <label>Date Posted:</label>
                  <div className={styles.items}>
                    {["24h", "7d", "14d", "30d"].map((period) => (
                      <div key={period} className={styles.check__item}>
                        <input
                          type="checkbox"
                          checked={filters.datePosted === period}
                          onChange={() =>
                            handleFilterChange("datePosted", period)
                          }
                        />
                        <p>
                          {period === "24h"
                            ? "Last 24 hours"
                            : period === "7d"
                            ? "Last 7 days"
                            : period === "14d"
                            ? "Last 14 days"
                            : "Last 30 days"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Type Filter */}
                <div className={styles.filter__item}>
                  <label>Job Type:</label>
                  <div className={styles.items}>
                    {["Full Time", "Part-Time", "Contract"].map(
                      (jobType) => (
                        <div key={jobType} className={styles.check__item}>
                          <input
                            type="checkbox"
                            checked={filters.jobType === jobType}
                            onChange={() =>
                              handleFilterChange("jobType", jobType)
                            }
                          />
                          <p>{jobType}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job listings */}
        {isLoading ? (
          <p className="text-center text-[18px] my-12">Loading jobs...</p>
        ) : currentJobs.length > 0 ? (
          <div
            className={`${styles.grid__body} grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8`}
          >
            {currentJobs.map((job) => {
              const salaryMinFormatted = job.salaryMin?.toLocaleString();
              const salaryMaxFormatted = job.salaryMax?.toLocaleString();

              return (
                <div
                  className={`${styles.jobs__card} overflow-hidden rounded-xl border border-gray-200`}
                  key={job.id}
                >
                  <div className={styles.card__info}>
                    <div className={styles.card__company}>
                      <div className={styles.card__logo}>
                        {job.companyInfo?.photo ? (
                          <img
                            src={job.companyInfo?.photo}
                            alt={job.companyInfo?.fullName}
                          />
                        ) : (
                          <img
                            src="/assets/images/user-icon.png"
                            alt={job.companyInfo?.fullName}
                          />
                        )}
                        <div className={styles.company__info}>
                          <h5 className={styles.company__name}>
                            {job.companyInfo?.fullName || ""}
                          </h5>
                          <p className={styles.company__location}>
                            <AiOutlineEnvironment />
                            {job.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <h4 className={styles.card__title}>{job.title}</h4>
                    <div className={styles.card__flex}>
                      <p className={styles.card__location}>
                        <CgBriefcase />
                        {job.jobType}
                      </p>
                      <p className={styles.card__time}>
                        <AiOutlineClockCircle />
                        {convertTimestamp(job.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className={styles.card__flex}>
                    <p className={styles.company__pay}>
                      NGN{salaryMinFormatted} - NGN{salaryMaxFormatted}
                    </p>
                    <Link
                      href={`/talent/jobs/details/${job.companyId}/${job.id}`}
                    >
                      <button className={styles.apply__button}>
                        View More
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.no__jobs}>No jobs found.</p>
        )}

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            className={styles.pagination__button}
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            className={styles.pagination__button}
            onClick={handleNextClick}
            disabled={currentPage === pageNumbers}
          >
            Next
          </button>
        </div>
        {detailsPage && (
          <JobDetails
            jobId={selectedJob}
            onClose={() => {
              setDetailsPage(false);
              setSelectedJob(null);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default JobGrid;
