import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgBriefcase } from "react-icons/cg";
import { AiOutlineClockCircle } from "react-icons/ai";
import styles from "./style.module.scss";

const jobUrl = "https://minujob.com/job-listings/";

export default function BrowseJobs() {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get(jobUrl);
      const jobListings = response.data.data;
      setJobPostings(jobListings);
    } catch (error) {
      console.error("Failed to fetch job listings:", error);
    }
  };

  return (
    <section className={styles.browseJobs__section}>
      <div className={styles.jobs__container}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Browse Jobs</h2>
          <p className={styles.section__subtitle}>Search and find the most exciting remote-friendly jobs.</p>
        </div>
        <div className={styles.jobs__categories}>
          <ul className={styles.categories__list}>
            <li className={styles.list__tab}>Human Resources</li>
            <li className={styles.list__tab}>Software Engineer</li>
            <li className={styles.list__tab}>Marketing and Sales</li>
            <li className={styles.list__tab}>Finance</li>
            <li className={styles.list__tab}>Content Writers</li>
          </ul>
        </div>
        <div className={styles.jobs__listings}>
          {jobPostings.map((job) => {
            const {
              id,
              attributes: {
                title,
                location,
                datePosted,
                company: {
                  data: {
                    attributes: {
                      name: companyName,
                      logo: {
                        data: {
                          attributes: { url: logoUrl },
                        },
                      },
                    },
                  },
                },
              },
            } = job;

            return (
              <div className={styles.jobs__card} key={id}>
                <div className={styles.card__info}>
                  <h4 className={styles.card__title}>{title}</h4>
                  <div className={styles.card__flex}>
                    <p className={styles.card__location}>
                      <CgBriefcase />
                      {location}
                    </p>
                    <p className={styles.card__time}>
                      <AiOutlineClockCircle />
                      {datePosted}
                    </p>
                  </div>
                  {/* Tags */}
                </div>
                <div className={styles.card__company}>
                  <div className={styles.card__logo}>
                    <img src={logoUrl} alt={companyName} />
                    <div className={styles.company__info}>
                      <h5 className={styles.company__name}>{companyName}</h5>
                      {/* Company location */}
                    </div>
                  </div>
                  {/* Company pay */}
                </div>
              </div>
            );
          })}
        </div>
        <button className={styles.browse__btn}>Browse More Jobs</button>
      </div>
    </section>
  );
}
