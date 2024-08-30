import React from "react";
import styles from "./style.module.scss";

export default function ExpectationSection() {
  return (
    <section className={styles.expect__section}>
      <div className={styles.expect__header}>
        <h2 className={styles.expect__title}>What to expect on EasyFind</h2>
        <p className={styles.expect__subtitle}>
          We’re here to help you get a job you love. Here’s how EasyFind works,
          in a nutshell:
        </p>
      </div>
      <ul className={styles.expect__list}>
        <li className={styles.expect__step}>
          <span className={styles.step__head}>Submit your profile</span>
          <p className={styles.step__text}>
            Fill out our free, 10-minute application. We’ll automatically review
            your profile and show you relevant jobs. Learn how to strengthen
            your profile in our Help Center.
          </p>
        </li>
        <li className={styles.expect__step}>
          <span className={styles.step__head}>Get interview requests</span>
          <p className={styles.step__text}>
            Employers see your profile on their curated talents list for 10
            weeks, and will send you interview requests if they are interested
            in talking to you.
          </p>
        </li>
        <li className={styles.expect__step}>
          <span className={styles.step__head}>Choose your opportunities </span>
          <p className={styles.step__text}>
            Accept or decline interview requests within 48 hours to maintain a
            high response rate. Be sure to keep your availability calendar
            updated so employers can schedule interviews promptly.
          </p>
        </li>
      </ul>
      <button className={styles.learn__more}>Learn More</button>
    </section>
  );
}
