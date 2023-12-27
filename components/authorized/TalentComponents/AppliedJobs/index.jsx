import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";
import "./style.scss";

const appliedJobsUrl = "https://minujob.com/applied-jobs/";

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
    <section className="appliedJobs__section">
      <div className="appliedJobs__container">
        <div className="appliedJobs__header">
          <h2 className="appliedJobs__title">Applied Jobs</h2>
        </div>
        {appliedJobs.length > 0 ? (
          
          <ul className="appliedJobs__list">
            {appliedJobs.map((job) => (
            <li className="appliedJobs__item">
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
                  <button className="btn__link">Withdraw</button>
                </Link>
              </div>
            </li>
            ))}
          </ul>
        ) : (
          <div className="no__appliedJobs">
            <h3 className="no__appliedJobs__title">No Applied Jobs</h3>
            <p className="appliedJobs__message">
              <IoAddCircle className="appliedJobs__icon" />
              Your applied jobs will appear here so you can keep track of your applications.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
