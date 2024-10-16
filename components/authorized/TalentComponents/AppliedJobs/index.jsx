import React, { useState, useEffect } from "react";
import { db, auth } from "../../../../firebaseConfig/firebase";
import {
  collection,
  query,
  getDoc,
  getDocs,
  where,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";
import styles from "./style.module.scss";

export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
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
      const unsubscribe = fetchAppliedJobs();
      return () => unsubscribe();
    }
  }, [userId]);

  // Fetches the applied jobs from the appropriate collection and subcollection
  const fetchAppliedJobs = () => {
    setIsLoading(true);

    // Assume the applied jobs are stored under 'companyCollection/{companyId}/jobs/{jobId}/applied'
    const companyCollectionRef = collection(db, "companyCollection");

    const unsubscribe = onSnapshot(companyCollectionRef, (companySnapshot) => {
      const jobs = [];

      companySnapshot.forEach((companyDoc) => {
        const jobsRef = collection(companyDoc.ref, "jobs");
        const jobsQuery = query(jobsRef);

        onSnapshot(jobsQuery, (jobsSnapshot) => {
          jobsSnapshot.forEach((jobDoc) => {
            const appliedRef = collection(jobDoc.ref, "applied");
            const appliedJobsQuery = query(
              appliedRef,
              where("userId", "==", userId)
            );

            onSnapshot(appliedJobsQuery, (appliedSnapshot) => {
              appliedSnapshot.forEach((appliedJobDoc) => {
                const appliedJobData = appliedJobDoc.data();
                jobs.push({
                  id: appliedJobDoc.id,
                  ...appliedJobData,
                  jobId: jobDoc.id,
                  companyId: companyDoc.id, // Including companyId for handling if needed
                });
              });

              setAppliedJobs(jobs);
              setIsLoading(false);
            });
          });
        });
      });
    });

    return unsubscribe;
  };

  const handleWithdraw = async (jobId, companyId) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    try {
      // Modify the path to match your actual Firestore structure
      const appliedJobRef = doc(
        db,
        `companyCollection/${companyId}/jobs/${jobId}/applied`,
        userId
      );

      await deleteDoc(appliedJobRef);

      const deletedDoc = await getDoc(appliedJobRef);

      if (!deletedDoc.exists()) {
        console.log("Application Withdrawn successfully.");

        setAppliedJobs((prevJobs) =>
          prevJobs.filter((job) => job.jobId !== jobId)
        );
      } else {
        console.error("Failed to delete application from Firestore.");
      }
    } catch (error) {
      console.error("Error removing job:", error.message);
    }
  };

  return (
    <section className={styles.appliedJobs__section}>
      <div className={styles.appliedJobs__container}>
        <div className={styles.appliedJobs__header}>
          <h2 className={styles.appliedJobs__title}>Applied Jobs</h2>
        </div>

        {isLoading ? (
          <p>Loading applied jobs...</p>
        ) : appliedJobs.length > 0 ? (
          <ul className={styles.appliedJobs__list}>
            {appliedJobs.map((job, index) => (
              <li key={index} className={styles.appliedJobs__item}>
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
                  <button
                    className={styles.btn__link}
                    onClick={() => handleWithdraw(job.jobId)}
                  >
                    Withdraw
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.no__appliedJobs}>
            <h3 className={styles.no__appliedJobs__title}>No Applied Jobs</h3>
            <p className={styles.appliedJobs__message}>
              <Link href="/talent/jobs">
                <IoAddCircle className={styles.appliedJobs__icon} />
              </Link>
              Your applied jobs will appear here so you can keep track of your
              applications.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
