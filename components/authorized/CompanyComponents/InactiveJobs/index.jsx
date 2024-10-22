"use client";
import React, { useEffect, useState } from "react";
import { getJobIdsFromCompany, getApplicantCount } from "../../../../firebaseConfig/companyStore";
import { getAuth } from "firebase/auth";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import LoadingScreen from "../../../utils/Loaders/Loader";

export default function InActiveJobs({ filterType = 'active' }) {
  const [jobs, setJobs] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      const jobData = await getJobIdsFromCompany();
      const auth = getAuth();
      const user = auth.currentUser;

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

      const filteredJobs = jobsWithApplicants.filter(job => job.active === (filterType === 'inactive'));

      const initialShowDetails = filteredJobs.reduce((acc, job) => {
        acc[job.jobId] = false;
        return acc;
      }, {});

      setJobs(filteredJobs);
      setShowDetails(initialShowDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filterType]);

  const handleEdit = (jobId) => {
    router.push(`/company/jobs/editjob/${jobId}`);
  };

  if (!jobs.length && !loading) {
    return (
      <section className={styles.activeJobs__section}>
        <div className={styles.activeJobs__container}>
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>
              {filterType === 'inactive' ? 'Active Jobs' : 'Inactive Jobs'}
            </h2>
          </div>
          <p className={styles.no__jobs}>No {filterType === 'inactive' ? "active" : "inactive"} jobs found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.activeJobs__section}>
      <div className={styles.activeJobs__container}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>
            {filterType === 'inactive' ? 'Active Jobs' : 'Inactive Jobs'}
          </h2>
        </div>
        <div className={styles.section__body}>
          <ul className={styles.activePostings__list}>
            {jobs.map(job => (
              <li className={styles.jobPosting} key={job.jobId}>
                <div className={styles.jobPosting__header}>
                  <h4 className={styles.jobPosting__title}>{job.title}</h4>
                  <button className={styles.edit__button} onClick={() => handleEdit(job.jobId)}>Edit</button>
                </div>
                <div className={styles.job__description}>
                  <h5 className={styles.job__subtitle}>Description:</h5>
                  <p className={styles.job__text}>{job.description}</p>
                </div>
                <div className={styles.jobPosting__actions}>
                <a href={`/company/jobs/${job.jobId}`}>
                    View More
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
