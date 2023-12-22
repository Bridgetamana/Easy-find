import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgBriefcase } from "react-icons/cg";
import { AiOutlineClockCircle } from "react-icons/ai";
import "./style.scss";

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
    <section className="browseJobs__section">
      <div className="jobs__container">
        <div className="section__header">
          <h2 className="section__title">Browse Jobs</h2>
          <p className="section__subtitle">Search and find the most exciting remote-friendly jobs.</p>
        </div>
        <div className="jobs__categories">
          <ul className="categories__list">
            <li className="list__tab">Human Resources</li>
            <li className="list__tab">Software Engineer</li>
            <li className="list__tab">Marketing and Sales</li>
            <li className="list__tab">Finance</li>
            <li className="list__tab">Content Writers</li>
          </ul>
        </div>
        <div className="jobs__listings">
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
              <div className="jobs__card" key={id}>
                <div className="card__info">
                  <h4 className="card__title">{title}</h4>
                  <div className="card__flex">
                    <p className="card__location">
                      <CgBriefcase />
                      {location}
                    </p>
                    <p className="card__time">
                      <AiOutlineClockCircle />
                      {datePosted}
                    </p>
                  </div>
                  {/* Tags */}
                </div>
                <div className="card__company">
                  <div className="card__logo">
                    <img src={logoUrl} alt={companyName} />
                    <div className="company__info">
                      <h5 className="company__name">{companyName}</h5>
                      {/* Company location */}
                    </div>
                  </div>
                  {/* Company pay */}
                </div>
              </div>
            );
          })}
        </div>
        <button className="browse__btn">Browse More Jobs</button>
      </div>
    </section>
  );
}
