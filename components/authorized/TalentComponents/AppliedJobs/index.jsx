import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";
import styles from "./style.module.scss";

const appliedJobsUrl = "https://localhost:3000/applied-jobs/";

export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(appliedJobsUrl);
      const appliedJobsData = response.data.data;
      setAppliedJobs(appliedJobsData);
    } catch (error) {
      console.error("Failed to fetch applied jobs:", error);
    }
  };

  return (
    <section className={styles.appliedJobs__section}>
      <div className={styles.appliedJobs__container}>
        <div className={styles.appliedJobs__header}>
          <h2 className={styles.appliedJobs__title}>Applied Jobs</h2>
        </div>
        {appliedJobs.length > 0 ? (
          <ul className={styles.appliedJobs__list}>
            {appliedJobs.map((job) => (
              <li className={styles.appliedJobs__item}>
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
                    <button className={styles.btn__link}>Withdraw</button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.no__appliedJobs}>
            <h3 className={styles.no__appliedJobs__title}>No Applied Jobs</h3>
            <p className={styles.appliedJobs__message}>
              <IoAddCircle className={styles.appliedJobs__icon} />
              Your applied jobs will appear here so you can keep track of your
              applications.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
