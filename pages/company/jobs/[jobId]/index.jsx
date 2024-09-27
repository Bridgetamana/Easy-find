import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getJobDetailsById } from "../../../../firebaseConfig/companyStore";
import styles from "./style.module.scss";

const JobDetailsPage = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const job = await getJobDetailsById(jobId);
      setJobDetails(job);
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.jobDetailsContainer}>
      <h1>{jobDetails?.title}</h1>
      <p>
        <span>Description:</span> {jobDetails?.description}
      </p>
      <p>
        <span>Location:</span> {jobDetails?.location}
      </p>
      <p>
        <span>Industry:</span> {jobDetails?.industry}
      </p>
      <p>
        <span>Job Level:</span> {jobDetails?.jobLevel}
      </p>
      <p>
        <span>Salary Range:</span> {jobDetails?.salaryMin} -{" "}
        {jobDetails?.salaryMax}
      </p>
      <p>
        <span>Employment Type:</span> {jobDetails?.employmentType}
      </p>
      <p>
        <span>Requirements:</span>
      </p>
      <div>{jobDetails?.requirements}</div>
      <p>
        <span>Benefits:</span>
      </p>
      <div>{jobDetails?.benefits}</div>

      <div className={styles.candidatesSection}>
        <h2>Candidates That Applied</h2>
        <p>No candidates have applied yet.</p>
      </div>

      <div className={styles.candidatesSection}>
        <div className={styles.candidatesList}>
          <h2>Candidates That Applied</h2>  
            <p>No candidates have applied yet.</p>
        </div>

        <div className={styles.candidatesList}>
          <h2>Candidates That Saved the Job</h2>     
            <p>No candidates have saved this job yet.</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
