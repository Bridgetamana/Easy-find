import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.scss";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";

const savedJobsUrl = "https://localhost:3000/saved-jobs/";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get(savedJobsUrl);
      const savedJobsData = response.data.data;
      setSavedJobs(savedJobsData);
    } catch (error) {
      console.error("Failed to fetch saved jobs:", error);
    }
  };

  return (
    <section className={styles.savedJobs__section}>
      <div className={styles.savedJobs__container}>
        <div className={styles.savedJobs__header}>
          <h2 className={styles.savedJobs__title}>Saved Jobs</h2>
        </div>
        {savedJobs.length > 0 ? (
          <ul className={styles.savedJobs__list}>
            {savedJobs.map((job) => (
              <li key={job} className={styles.savedJobs__item}>
                <div className={styles.item__header}>
                  <div className={styles.companyLogo}>
                    <img
                      src="https://static.otta.com/uploads/images/company-favicons/5996-iQnDzA7rv2dBoZXhl3l357RZDToiw5971gg7F-ba6ME.jpg"
                      alt="Company Logo"
                    />
                  </div>
                  <div className={styles.companyNames}>
                    <h3 className={styles.companyName}>Alpha Alpha</h3>
                    <p className={styles.jobTitle}>Web Developer</p>
                  </div>
                </div>
                <div className={styles.item__buttons}>
                  <Link href="/">
                    <button className={styles.btn__link}>View</button>
                  </Link>
                  <Link href="/">
                    <button className={styles.btn__link}>Apply</button>
                  </Link>
                  <Link href="/">
                    <button className={styles.btn__link}>Remove</button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.no__savedJobs}>
            <h3 className={styles.no__savedJobs__title}>No Saved Jobs</h3>
            <p className={styles.savedJobs__message}>
              <Link href="/talent/jobs"><IoAddCircle className={styles.savedJobs__icon} /></Link>
              Your saved jobs will appear here so you can choose which to apply
              for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
