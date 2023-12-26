import React from "react";
import "./style.scss";

export default function StepsToHire() {
  return (
    <section className="expect__section">
      <div className="expect__header">
        <h2 className="expect__title">What to expect on our platform</h2>
        <p className="expect__subtitle">
          We’re here to help you find the right talentss for your job openings. Here’s how our platform works, in a nutshell:
        </p>
      </div>
      <ul className="expect__list">
        <li className="expect__step">
          <span className="step__head">Post your job openings</span>
          <p className="step__text">
            Create and publish your job listings on our platform. Provide a detailed description and requirements to attract the right talentss.
          </p>
        </li>
        <li className="expect__step">
          <span className="step__head">Review talents profiles</span>
          <p className="step__text">
            Browse through talents profiles that match your job requirements. Shortlist talentss and send them interview requests if you're interested in talking to them.
          </p>
        </li>
        <li className="expect__step">
          <span className="step__head">Manage interview requests</span>
          <p className="step__text">
            Stay responsive and manage interview requests promptly. Communicate with talentss, schedule interviews, and update the status of the hiring process.
          </p>
        </li>
      </ul>
      <button className="learn__more">
        Learn More
      </button>
    </section>
  );
}
