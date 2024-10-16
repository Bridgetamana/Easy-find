import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle, AiOutlineEnvironment } from "react-icons/ai";
import { CgBriefcase } from "react-icons/cg";
import Link from "next/link";
import { getJobs, searchJobs } from "@/firebaseConfig/talentStore";
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
  const [noResults, setNoResults] = useState(false);
  const router = useRouter();
  const jobsPerPage = 8;

  //Display all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      const jobList = await getJobs();
      setJobs(jobList);
      setFilteredJobs(jobList);
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!searchInput || searchInput.trim() === "") {
      setFilteredJobs(jobs);
      setNoResults(false);
    } else {
      const searchTerm = searchInput.toLowerCase();
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.location.toLowerCase().includes(searchTerm)
      );

      if (filtered.length > 0) {
        setFilteredJobs(filtered);
        setNoResults(false);
      } else {
        setFilteredJobs([]);
        setNoResults(true);
      }
    }
  }, [searchInput, jobs]);

  const isFilterToggled = () => {
    setToggleFilter(!toggleFilter);
    setToggleSort(false);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = Math.ceil(jobs.length / jobsPerPage);

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

  const handleDetailsPage = (jobId, companyId) => {
    router.push(`/talent/jobs/details/${companyId}/${jobId}`);
  };

  return (
    <section className={` ${styles.job__grid} py-12 my-24 bg-white`}>
      <div className="w-[90%] m-auto">
        <div className="mx-auto max-w-xl text-center my-6">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore the latest job openings
          </p>
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Discover jobs most relevant to you
          </h2>
        </div>
        <div className={styles.grid__header}>
          <div className={styles.header__left}>
            <h5 className={styles.total__jobs}>
              Showing{" "}
              <span className={styles.job__number}>
                {indexOfFirstJob + 1} -{" "}
                {indexOfLastJob > jobs.length ? jobs.length : indexOfLastJob}
              </span>{" "}
              of available jobs
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
                  <label htmlFor="location">Date Posted:</label>
                  <div className={styles.items}>
                    <div className={styles.check__item}>
                      {" "}
                      <input
                        type="checkbox"
                        className={styles.sort__check}
                        value="last 24 Hours"
                      />
                      <p>Last 24 hours</p>
                    </div>
                    <div className={styles.check__item}>
                      {" "}
                      <input
                        type="checkbox"
                        className={styles.sort__check}
                        value="last7 Days"
                      />
                      <p>Last 7 days</p>
                    </div>
                    <div className={styles.check__item}>
                      {" "}
                      <input
                        type="checkbox"
                        className={styles.sort__check}
                        value="last 14 Days"
                      />
                      <p>Last 14 days</p>
                    </div>
                    <div className={styles.check__item}>
                      {" "}
                      <input
                        type="checkbox"
                        className={styles.sort__check}
                        value="last 30 Days"
                      />
                      <p>Last 30 days</p>
                    </div>
                  </div>
                </div>
                <div className={styles.filter__item}>
                  <label htmlFor="specialism">Specialism:</label>
                  <div className={styles.items}>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="IT Contractor"
                      />
                      <p> IT Contractor </p>
                    </div>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="Charity & Voluntary"
                      />
                      <p> Charity & Voluntary </p>
                    </div>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        value="Digital & Creative"
                      />
                      <p>Digital & Creative</p>
                    </div>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="Estate Agency"
                      />
                      Estate Agency
                    </div>
                  </div>
                </div>
                <div className={styles.filter__item}>
                  <label htmlFor="jobType">Job Type:</label>
                  <div className={styles.items}>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="Full Time"
                      />
                      <p> Full Time </p>
                    </div>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="Part-Time"
                      />
                      <p>Part-Time</p>
                    </div>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="Freelance"
                      />
                      <p>Freelance</p>
                    </div>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="Temporary"
                      />
                      <p>Temporary</p>
                    </div>
                  </div>
                </div>
                <div className={styles.filter__item}>
                  <label htmlFor="experience">Experience:</label>
                  <div className={styles.items}>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="Less than 1 year"
                      />
                      <p>Less than 1 year</p>
                    </div>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="2 Year"
                      />
                      <p>2 Year</p>
                    </div>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="3 Year"
                      />
                      <p>3 Year</p>
                    </div>
                    <div className={styles.check__item}>
                      <input
                        type="checkbox"
                        name=""
                        id="filter__checkbox"
                        value="4 Year"
                      />
                      <p>4 Year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <LoadingScreen />}

        {/* Job listings */}
        {filteredJobs.length > 0 ? (
          <div
            className={`${styles.grid__body} grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8`}
          >
            {filteredJobs.map((job) => {
              const salaryMinFormatted = job.minSalary?.toLocaleString();
              const salaryMaxFormatted = job.maxSalary?.toLocaleString();
              const timePostedFormatted = new Date(
                job.datePosted
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });

              return (
                <div
                  className={`${styles.jobs__card} overflow-hidden rounded-xl border border-gray-200`}
                  key={job.id}
                >
                  <div className={styles.card__info}>
                    <div className={styles.card__company}>
                      <div className={styles.card__logo}>
                        <img src={job.companyLogo} alt={job.companyName} />
                        <div className={styles.company__info}>
                          <h5 className={styles.company__name}>
                            {job.companyName}
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
                        {timePostedFormatted}
                      </p>
                    </div>
                  </div>
                  <div className={styles.card__flex}>
                    <p className={styles.company__pay}>
                      ${salaryMinFormatted} - ${salaryMaxFormatted}
                    </p>
                    <button
                      className={styles.apply__button}
                      onClick={() => handleDetailsPage(job.id, job.companyId)}
                    >
                      View More
                    </button>
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

          {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                className={`pagination__button ${
                  currentPage === pageNumber ? "pagination__active" : ""
                }`}
                key={pageNumber}
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}

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
