"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import { useRouter } from "next/navigation";

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
      const inactiveJobs = fetchedJobs.filter(
        (job) => job.attributes.inactive === true
      );

      // Create showDetails object with default values
      const initialShowDetails = inactiveJobs.reduce((acc, job) => {
        acc[job.id] = false;
        return acc;
      }, {});

      setJobs(inactiveJobs);
      setShowDetails(initialShowDetails);
      console.log(inactiveJobs);
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
    <section className="inactiveJobs__section">
      <div className="inactiveJobs__container">
        <div className="section__header">
          <h2 className="section__title">Inactive Jobs</h2>
        </div>
        <div className="section__body">
          <ubl className="inactivePostings__list">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <li className="jobPosting" key={job.id}>
                  <div className="jobPosting__header">
                    <h4 className="jobPosting__title">
                      {job.attributes.title}
                    </h4>
                    <button className="edit__button" onClick={() => handleEdit(job.id)}>Edit</button>
                  </div>
                  <div className="job__description">
                    <h5 className="job__subtitle">Description:</h5>
                    <p className="job__text">{job.attributes.description}</p>
                  </div>
                  <div className="post__column">
                    <div className="post__container">
                      <h5 className="jobPosting__subtitle">Employment Type:</h5>
                      <ul className="jobPosting__listItem">
                        <li>{job.attributes.jobType}</li>
                      </ul>
                    </div>
                    <div className="post__container">
                      <h5 className="jobPosting__subtitle">Location:</h5>
                      <ul className="jobPosting__listItem">
                        <li>{job.attributes.location}</li>
                      </ul>
                    </div>
                    <div className="post__container">
                      <h5 className="jobPosting__subtitle">Salary:</h5>
                      <ul className="jobPosting__listItem">
                        <li>
                          ${job.attributes.salaryMin.toLocaleString()} - $
                          {job.attributes.salaryMax.toLocaleString()} per year
                        </li>
                      </ul>
                    </div>
                    <div className="post__container">
                      <h5 className="jobPosting__subtitle">Experience:</h5>
                      <ul className="jobPosting__listItem">
                        <li>{job.attributes.jobLevel}</li>
                      </ul>
                    </div>
                  </div>
                  {showDetails[job.id] && (
                    <div className="post__row">
                      <div className="post__container">
                        <h5 className="jobPosting__subtitle">Requirements:</h5>
                        <ul className="jobPosting__listItem">
                          <li>Experience with HTML, CSS, and JavaScript</li>
                          <li>Strong problem-solving skills</li>
                          <li>
                            Excellent communication and collaboration abilities
                          </li>
                        </ul>
                      </div>
                      <div className="post__container">
                        <h5 className="jobPosting__subtitle">Benefits:</h5>
                        <ul className="jobPosting__listItem">
                          <li>Healthcare coverage</li>
                          <li>Flexible work hours</li>
                          <li>401(k) retirement plan</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="jobPosting__actions">
                    <div className="candidate__info">
                      <p className="total__candidates">2 candidates applied</p>
                      <button
                        className="view__button"
                        onClick={() => handleViewMore(job.id)}
                      >
                        {showDetails[job.id] ? "View Less" : "View More"}
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="no__jobs">No inactive jobs found.</p>
            )}
          </ubl>
        </div>
      </div>
    </section>
  );
}
