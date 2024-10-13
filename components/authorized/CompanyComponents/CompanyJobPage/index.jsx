import React, { useEffect, useState } from "react";
import {
  getJobIdsFromCompany,
  deleteJob,
  updateJobStatus,
  getApplicantCount, 
  getApplicantsByJobId, 
} from "../../../../firebaseConfig/companyStore";
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import styles from "./style.module.scss";

const JobPage = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(false);

  const [applicantDetails, setApplicantDetails] = useState(null);
  const [showApplicants, setShowApplicants] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getJobIdsFromCompany();
        
        if (!user) {
          throw new Error("User not authenticated");
        }

        const companyId = user.uid;
        const jobsWithApplicants = await Promise.all(
          jobData.map(async (job) => {
            const applicantCount = await getApplicantCount(job.jobId, companyId);
            return { ...job, applicantCount };
          })
        );

        setJobs(jobsWithApplicants);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  const handleMenuClick = (jobId) => {
    setActiveDropdown(activeDropdown === jobId ? false : jobId);
  };

  const handleEditJob = (jobId) => {
    router.push(`/company/jobs/editjob/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId); 
      alert('Job deleted successfully');

      setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
      setActiveDropdown(activeDropdown === jobId ? false : jobId);
    } catch (error) {
      alert('Error deleting job: ' + error.message);
    }
  };

  const handleCloseJob = async (jobId, isActive) => {
    try {
      await updateJobStatus(jobId, isActive);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobId === jobId ? { ...job, active: !isActive } : job
        )
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handleViewApplicants = async (jobId) => {
    const companyId = user.uid;
    const applicants = await getApplicantsByJobId(jobId, companyId);
    setApplicantDetails(applicants);
    setShowApplicants(jobId);
    setActiveDropdown(activeDropdown === jobId ? false : jobId);
  };

  if (loading) {
    return <div className={styles.spinner}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error fetching jobs: {error.message}</div>;
  }

  if (!jobs.length) {
    return <div className={styles.no__jobs}>No job posts available.</div>;
  }

  return (
    <div className={styles.table__container}>
      <table className={styles.jobs__table}>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Applicants</th>
            <th>Date Posted</th>
            <th>Job Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.jobId}>
              <td>
                <a
                  href={`/company/jobs/${job.jobId}`}
                  className={styles.job__link}
                >
                  {job.title}
                </a>
              </td>
              <td>{job.applicantCount || "No applicants yet"}</td>
              <td>{job.createdAt.toDate().toDateString()}</td>
              <td>
                <span
                  className={`${styles.job__status} ${
                  job.active 
                  ? styles.active 
                  : styles.inactive
                  }`}
                >
                  {job.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="text-right">
                <div className={styles.dropdown}>
                  <button
                    onClick={() => handleMenuClick(job.jobId)}
                    className={styles.dropdown__button}
                  >
                    <CiMenuKebab />
                  </button>
                  {activeDropdown === job.jobId && (
                    <div className={styles.dropdown__menu}>
                      <button onClick={() => handleEditJob(job.jobId)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteJob(job.jobId)}>
                        Delete
                      </button>
                      <button onClick={() => handleCloseJob(job.jobId, job.active)}>
                        {job.active ? "Close" : "Open"}
                      </button>
                      <button onClick={() => handleViewApplicants(job.jobId)}> 
                        View Applicants
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobPage;
