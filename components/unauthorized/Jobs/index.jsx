'use client'
import React, { useState, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import { getJobs } from "@/firebaseConfig/talentStore";
import { companyStore } from "@/firebaseConfig/companyStore";
import styles from "./style.module.scss";
import JobGrid from "@/components/authorized/JobGrid";

const words = ['the most exciting', 'remote-friendly', 'your dream', 'the amazing',]

export default function BrowseJobs({ setSearchInput, searchInput }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [fade, setFade] = useState(true);
  const [searchValue, setSearchValue] = useState(""); 
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [noResults, setNoResults] = useState(false);
  

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); 
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
    const fetchJobPostings = async () => {
      setIsLoading(true); 
      try {
        const jobList = await getJobs();
        
        const jobsWithCompany = await Promise.all(
          jobList.map(async (job) => {
            const companyInfo = await companyStore.getCompanyStoreById(job.companyId);
            return {
              ...job,
              companyInfo: companyInfo || {}
            };
          })
        );
        
        setJobs(jobsWithCompany);
        setFilteredJobs(jobsWithCompany);
      } catch (error) {
        console.error("Error fetching jobs and company info:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchJobPostings();
  }, []);

  useEffect(() => {
    if (!searchInput || searchInput.trim() === "") {
      setFilteredJobs(jobs);
      setNoResults(false);
    } else {
      const searchTerm = searchInput.toLowerCase();
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.location.toLowerCase().includes(searchTerm) || 
          job.jobType.toLowerCase().includes(searchTerm) ||
          job.jobLevel.toLowerCase().includes(searchTerm) ||
          job.companyInfo.fullName.toLowerCase().includes(searchTerm) 
          
      )

      if (filtered.length > 0) {
        setFilteredJobs(filtered);
        setNoResults(false);
      } else {
        setFilteredJobs([]);
        setNoResults(true);
      }
    }
  }, [searchInput, jobs]);


  return (
    <section className={styles.browseJobs__section}>
      <div className={styles.jobs__container}>
        <div className={styles.section__header}>
          <h3 className={styles.section__subtitle}> Search and find {" "}
          <span className={`${styles.rotating__word} ${fade ? styles.fade__in : styles.fade__out}`}>{currentWord}</span> jobs.</h3>
        </div>
        <div className={styles.hero__searchBar}>
          <HiSearch />
          <input
            type="search"
            name="search-bar"
            className={styles.search__bar}
            placeholder="Job Title, Skill or Company"
            value={searchValue} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
      
        <JobGrid searchInput={searchValue} jobs={filteredJobs} />
    </section>
  );
}
