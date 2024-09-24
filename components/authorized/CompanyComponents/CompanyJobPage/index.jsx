import React, { useEffect, useState } from "react";
import { getJobIdsFromCompany, deleteJob  } from "../../../../firebaseConfig/companyStore";
import { CiMenuKebab } from "react-icons/ci";
import styles from "./style.module.scss"; 

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getJobIdsFromCompany();
        setJobs(jobData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleMenuClick = (jobId) => {
    setActiveDropdown(activeDropdown === jobId ? false : jobId);
  };

  const handleEditJob = () => {
    console.log("edit button has been clicked");

  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId); 
      alert('Job deleted successfully');

      setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
    } catch (error) {
      alert('Error deleting job: ' + error.message);
    }
  };

  const handleCloseJob = () => {
    console.log("close button has been clicked");
  };

  if (loading) {
    return <div className={styles.spinner}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error fetching jobs: {error.message}</div>;
  }

  return (
    <section className={styles.jobs__page}>
      <h1 className={styles.page__title}> Job Posts</h1>

      <div className={styles.job__container}>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <>
            {/* Table view */}
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
                      <a href={`/jobs/${job.jobId}`} className={styles.job__link}>
                        {job.title}
                      </a>
                    </td>
                    <td>{job.applicantCount || "No applicants yet"}</td>
                    <td>{job.createdAt.toDate().toDateString()}</td>
                    <td className={styles.job__status}>{job.active ? "Active" : "Inactive"}</td>
                    <td>
                      <div className={styles.dropdown}>
                        <button onClick={() => handleMenuClick(job.jobId)} className={styles.dropdown__button}>
                          <CiMenuKebab />
                        </button>
                        {activeDropdown === job.jobId && (
                          <div className={styles.dropdown__menu}>
                            <button onClick={() => handleEditJob(job.jobId)}>Edit</button>
                            <button onClick={() => handleDeleteJob(job.jobId)}>Delete</button>
                            <button onClick={() => handleCloseJob(job.jobId)}>Close</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Card view */}
            <div className={styles.jobs__grid}>
              {jobs.map((job) => (
                <div key={job.jobId} className={styles.job__card}>
                  <div className={styles.job_header}>
                    <a href="/" className={styles.job__link}>
                      {job.title}
                    </a>
                    <button onClick={() => handleMenuClick(job.jobId)} className={styles.dropdown__button}>
                      <CiMenuKebab />
                    </button>
                    
                  </div>
                  <div className={styles.dropdown}>
                    {activeDropdown === job.jobId && (
                      <div className={styles.dropdown__menu}>
                        <button onClick={() => handleEditJob(job.jobId)}>Edit</button>
                        <button onClick={() => handleDeleteJob(job.jobId)}>Delete</button>
                        <button onClick={() => handleCloseJob(job.jobId)}>Close</button>
                      </div>
                    )}
                  </div>
                  <p>Applicants: {job.applicantCount || "No applicants yet"}</p>
                  <p>Date Posted: {job.createdAt.toDate().toDateString()}</p>
                  <p>Job Status: {job.active ? "Active" : "Inactive"}</p>
                 
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default JobPage;
