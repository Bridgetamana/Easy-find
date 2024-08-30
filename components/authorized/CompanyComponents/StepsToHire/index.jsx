import React from "react";
import styles from "./style.module.scss";

export default function StepsToHire() {
  return (
    <section className={styles.expect__section}>
      <div className={styles.expect__header}>
        <h2 className={styles.expect__title}>What to expect on our platform</h2>
        <p className={styles.expect__subtitle}>
          We’re here to help you find the right talentss for your job openings.
          Here’s how our platform works, in a nutshell:
        </p>
      </div>
      <ul className={styles.expect__list}>
        <li className={styles.expect__step}>
          <span className={styles.step__head}>Post your job openings</span>
          <p className={styles.step__text}>
            Create and publish your job listings on our platform. Provide a
            detailed description and requirements to attract the right talentss.
          </p>
        </li>
        <li className={styles.expect__step}>
          <span className={styles.step__head}>Review talents profiles</span>
          <p className={styles.step__text}>
            Browse through talents profiles that match your job requirements.
            Shortlist talentss and send them interview requests if you're
            interested in talking to them.
          </p>
        </li>
        <li className={styles.expect__step}>
          <span className={styles.step__head}>Manage interview requests</span>
          <p className={styles.step__text}>
            Stay responsive and manage interview requests promptly. Communicate
            with talentss, schedule interviews, and update the status of the
            hiring process.
          </p>
        </li>
      </ul>
      <button className={styles.learn__more}>Learn More</button>
    </section>
  );
}
