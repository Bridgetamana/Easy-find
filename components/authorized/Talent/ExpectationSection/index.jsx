import React from "react";
import "./style.scss";

export default function ExpectationSection() {
  return (
    <section className="expect__section">
      <div className="expect__header">
        <h2 className="expect__title">What to expect on Hired</h2>
        <p className="expect__subtitle">
          We’re here to help you get a job you love. Here’s how Hired works, in
          a nutshell:
        </p>
      </div>
      <ul className="expect__list">
        <li className="expect__step">
          <span className="step__head">Submit your profile</span>
          <p className="step__text">
            Fill out our free, 10-minute application. We’ll automatically review
            your profile and show you relevant jobs. Learn how to strengthen
            your profile in our Help Center.
          </p>
        </li>
        <li className="expect__step">
          <span className="step__head">Get interview requests</span>
          <p className="step__text">
            Employers see your profile on their curated talents list for 10
            weeks, and will send you interview requests if they are interested
            in talking to you.
          </p>
        </li>
        <li className="expect__step">
          <span className="step__head">Choose your opportunities </span>
          <p className="step__text">
            Accept or decline interview requests within 48 hours to maintain a
            high response rate. Be sure to keep your availability calendar updated
            so employers can schedule interviews promptly.
          </p>
        </li>
      </ul>
      <button className="learn__more">
        Learn More
      </button>
    </section>
  );
}
