import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../firebaseConfig/firebase"; 
import { collection, query, where, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import styles from "./style.module.scss";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const currentUser = auth.currentUser; 
    if (currentUser) {
      setUserId(currentUser.uid);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchSavedJobs();
    }
  }, [userId]);

  const fetchSavedJobs = async () => {
    setIsLoading(true); 
    try {
      const userId = auth.currentUser?.uid; 
      if (!userId) {
        console.error("User is not logged in");
        return;
      }
  
      const companiesRef = collection(db, "companyCollection");
      const companiesSnapshot = await getDocs(companiesRef);
      const jobs = [];

      // Loop through all companies
      for (const companyDoc of companiesSnapshot.docs) {
        const jobsRef = collection(companyDoc.ref, "jobs");
        const jobsSnapshot = await getDocs(jobsRef);

        // Loop through jobs for each company
        for (const jobDoc of jobsSnapshot.docs) {
          const savedForLaterRef = doc(db, `companyCollection/${companyDoc.id}/jobs/${jobDoc.id}/savedForLater/${userId}`);
          const savedJobDoc = await getDoc(savedForLaterRef);

          if (savedJobDoc.exists()) {
            const savedJobData = savedJobDoc.data();
            jobs.push({
              id: savedJobDoc.id,
              ...savedJobData,
              jobId: jobDoc.id,
              companyId: companyDoc.id,  // Include companyId for reference
            });
          }
        }
      }

      setSavedJobs(jobs);
    } catch (error) {
      console.error("Failed to fetch saved jobs:", error);
    } finally {
      setIsLoading(false); 
    }
  };  

  const handleDelete = async (jobId, companyId) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    try {
      const savedJobRef = doc(db, `companyCollection/${companyId}/jobs/${jobId}/savedForLater`, userId);

      await deleteDoc(savedJobRef);

      console.log("Job removed successfully.");
      setSavedJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));

    } catch (error) {
      console.error("Error removing job:", error.message);
    }
  };

  
  return (
    <section className={styles.savedJobs__section}>
      <div className={styles.savedJobs__container}>
        <div className={styles.savedJobs__header}>
          <h2 className={styles.savedJobs__title}>Saved Jobs</h2>
        </div>

        {isLoading ? (
          <p>Loading saved jobs...</p>
        ) : savedJobs.length > 0 ? (
          <ul className={styles.savedJobs__list}>
            {savedJobs.map((job, index) => (
              <li key={index} className={styles.savedJobs__item}>
                <div className={styles.item__header}>
                  <div className={styles.companyLogo}>
                    <img
                      src="https://static.otta.com/uploads/images/company-favicons/5996-iQnDzA7rv2dBoZXhl3l357RZDToiw5971gg7F-ba6ME.jpg"
                      alt="Company Logo"
                    />
                  </div>
                  <div className={styles.companyNames}>
                    <h3 className={styles.companyName}>{job.company}</h3>
                    <p className={styles.jobTitle}>{job.title}</p>
                  </div>
                </div>
                <div className={styles.item__buttons}>
                  <Link href={`/talent/jobs/details/${job.jobId}`}>
                    <button className={styles.btn__link}>View</button>
                  </Link>
                  <Link href={`/talent/jobs/details/${job.jobId}`}>
                    <button className={styles.btn__link}>Apply</button>
                  </Link>
                  <button className={styles.btn__link} onClick={() => handleDelete(job.jobId)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.no__savedJobs}>
            <h3 className={styles.no__savedJobs__title}>No Saved Jobs</h3>
            <p className={styles.savedJobs__message}>
              <Link href="/talent/jobs">
                <IoAddCircle className={styles.savedJobs__icon} />
              </Link>
              Your saved jobs will appear here so you can choose which to apply
              for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
