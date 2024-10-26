import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

export default function TalentHero() {
  return (
    <section className={styles.hero__section}>
      <div className={styles.hero__content}>
        <div className={styles.content__header}>
          <p className={styles.hero__text}>
            Each month, more than 3 million job seekers turn to EasyFind website
            in their search for work, making over 140,000 applications every
            single day. You can be part of this number by creating an account
            with us.
          </p>
        </div>
        <div className={styles.content__boxes}>
          <Link href='/talent/profile' className={styles.content__box}>
            <h3 className={styles.box__title}>Complete Profile</h3>
            <p className={styles.box__text}>
            Add a professional profile picture, a concise bio highlighting your skills and experience to make your profile stand out to potential employers.
            </p>
          </Link>
          <Link href="/talent/jobs" className={styles.content__box}>
            <h3 className={styles.box__title}>Explore Jobs</h3>
            <p className={styles.box__text}>
            Browse through a wide range of job postings from top companies on EasyFind. Use our search filters to find the perfect match for your career goals.
            </p>
          </Link>
          <div className={styles.content__box}>
            <h3 className={styles.box__title}>Get Hired</h3>
            <p className={styles.box__text}>
            Submit your application and showcase your qualifications. With EasyFind, you're one step closer to securing your dream job.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
