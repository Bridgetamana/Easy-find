import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgBriefcase } from "react-icons/cg";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Link from "next/link";
import styles from "./style.module.scss";

const jobUrl = "https://localhost:3000/job-listings/";
const words = ['the most exciting', 'remote-friendly', 'your dream', 'the amazing',]

export default function BrowseJobs({ setSearchInput }) {
  const [jobPostings, setJobPostings] = useState([]);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [fade, setFade] = useState(true);
  const [searchValue, setSearchValue] = useState(""); 

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); 
    setSearchInput(value); 
  };

  useEffect(() => {
    let wordIndex = 0;

    const changeWord = () => {
      setFade(false); 
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        setCurrentWord(words[wordIndex]);
        setFade(true); 
      }, 500); 
    };

    const intervalId = setInterval(changeWord, 3000); 

    return () => clearInterval(intervalId); 
  }, []);

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
          <h3 className={styles.section__subtitle}> Search and find {" "}
          <span className={`${styles.rotating__word} ${fade ? styles.fade__in : styles.fade__out}`}>{currentWord}</span> jobs.</h3>
        </div>
        <div className={styles.hero__searchBar}>
          <input
            type="search"
            name="search-bar"
            className={styles.search__bar}
            placeholder="Job Title, Skill or Company"
            value={searchValue} 
            onChange={handleInputChange} 
          />
          <Link href="/search" className={styles.hero__button}>
            <HiOutlineArrowNarrowRight className={styles.search__icon} />
            <p>Find Jobs</p>
          </Link>
        </div>

        <div className={styles.jobs__categories}>
          <h2 className={styles.categories__title}>Popular Searches</h2>
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
