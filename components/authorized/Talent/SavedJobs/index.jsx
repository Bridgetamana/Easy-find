import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";

const savedJobsUrl = "https://minujob.com/saved-jobs/";

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
    <section className="savedJobs__section">
      <div className="savedJobs__container">
        <div className="savedJobs__header">
          <h2 className="savedJobs__title">Saved Jobs</h2>
        </div>
        {savedJobs.length > 0 ? (
          <ul className="savedJobs__list">
            {savedJobs.map((job) => (
            <li key={job} className="savedJobs__item">
              <div className="item__header">
                <div className="companyLogo">
                  <img
                    src="https://static.otta.com/uploads/images/company-favicons/5996-iQnDzA7rv2dBoZXhl3l357RZDToiw5971gg7F-ba6ME.jpg"
                    alt="Company Logo"
                  />
                </div>
                <div className="companyNames">
                  <h3 className="companyName">Alpha Alpha</h3>
                  <p className="jobTitle">Web Developer</p>
                </div>
              </div>
              <div className="item__buttons">
                <Link href="/">
                  <button className="btn__link">View</button>
                </Link>
                <Link href="/">
                  <button className="btn__link">Apply</button>
                </Link>
                <Link href="/">
                  <button className="btn__link">Remove</button>
                </Link>
              </div>
            </li>
            ))}
          </ul>
        ) : (
          <div className="no__savedJobs">
          <h3 className="no__savedJobs__title">No Saved Jobs</h3>
          <p className="savedJobs__message">
            <IoAddCircle className="savedJobs__icon" />
            Your saved jobs will appear here so you can choose which to apply
            for.
          </p>
        </div>
        )}
      </div>
    </section>
  );
}
