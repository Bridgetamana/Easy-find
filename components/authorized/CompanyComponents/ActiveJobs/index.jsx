"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import style from "./style.module.scss";

export default function ActiveJobs() {
  const [jobs, setJobs] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/jobs");
      const fetchedJobs = response.data.data;

      // Filter active jobs
      const activeJobs = fetchedJobs.filter(
        (job) => job.attributes.active === true
      );

      // Create showDetails object with default values
      const initialShowDetails = activeJobs.reduce((acc, job) => {
        acc[job.id] = false;
        return acc;
      }, {});

      setJobs(activeJobs);
      setShowDetails(initialShowDetails);
      console.log(activeJobs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewMore = (jobId) => {
    setShowDetails((prevShowDetails) => ({
      ...prevShowDetails,
      [jobId]: !prevShowDetails[jobId],
    }));
  };

  const handleEdit = (jobId) => {
    // Find the selected job based on jobId
    const selectedJob = jobs.find((job) => job.id === jobId);

    if (selectedJob) {
      // Navigate to the edit page with job data as query parameters
      setTimeout(() => {
        router.push({
          pathname: "/company/dashboard/edit-job-post",
          query: { jobId, ...selectedJob.attributes },
        });
      }, 0);
      
    }
  };
  
  return (
    <section className={style.activeJobs__section}>
      <div className={style.activeJobs__container}>
        <div className={style.section__header}>
          <h2 className={style.section__title}>Active Jobs</h2>
        </div>
        <div className={style.section__body}>
          <ul className={style.activePostings__list}>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <li className={style.jobPosting} key={job.id}>
                  <div className={style.jobPosting__header}>
                    <h4 className={style.jobPosting__title}>
                      {job.attributes.title}
                    </h4>
                    <button className={style.edit__button} onClick={() => handleEdit(job.id)}>Edit</button>
                  </div>
                  <div className={style.job__description}>
                    <h5 className={style.job__subtitle}>Description:</h5>
                    <p className={style.job__text}>{job.attributes.description}</p>
                  </div>
                  <div className={style.post__column}>
                    <div className={style.post__container}>
                      <h5 className={style.jobPosting__subtitle}>Employment Type:</h5>
                      <ul className={style.jobPosting__listItem}>
                        <li>{job.attributes.jobType}</li>
                      </ul>
                    </div>
                    <div className={style.post__container}>
                      <h5 className={style.jobPosting__subtitle}>Location:</h5>
                      <ul className={style.jobPosting__listItem}>
                        <li>{job.attributes.location}</li>
                      </ul>
                    </div>
                    <div className={style.post__container}>
                      <h5 className={style.jobPosting__subtitle}>Salary:</h5>
                      <ul className={style.jobPosting__listItem}>
                        <li>
                          ${job.attributes.salaryMin.toLocaleString()} - $
                          {job.attributes.salaryMax.toLocaleString()} per year
                        </li>
                      </ul>
                    </div>
                    <div className={style.post__container}>
                      <h5 className={style.jobPosting__subtitle}>Experience:</h5>
                      <ul className={style.jobPosting__listItem}>
                        <li>{job.attributes.jobLevel}</li>
                      </ul>
                    </div>
                  </div>
                  {showDetails[job.id] && (
                    <div className={style.post__row}>
                      <div className={style.post__container}>
                        <h5 className={style.jobPosting__subtitle}>Requirements:</h5>
                        <ul className={style.jobPosting__listItem}>
                          <li>Experience with HTML, CSS, and JavaScript</li>
                          <li>Strong problem-solving skills</li>
                          <li>
                            Excellent communication and collaboration abilities
                          </li>
                        </ul>
                      </div>
                      <div className={style.post__container}>
                        <h5 className={style.jobPosting__subtitle}>Benefits:</h5>
                        <ul className={style.jobPosting__listItem}>
                          <li>Healthcare coverage</li>
                          <li>Flexible work hours</li>
                          <li>401(k) retirement plan</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className={style.jobPosting__actions}>
                    <div className={style.candidate__info}>
                      <p className={style.total__candidates}>2 candidates applied</p>
                      <button
                        className={style.view__button}
                        onClick={() => handleViewMore(job.id)}
                      >
                        {showDetails[job.id] ? "View Less" : "View More"}
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className={style.no__jobs}>No active jobs found.</p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
