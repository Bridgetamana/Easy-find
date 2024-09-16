import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero__section}>
      <div className={styles.hero__content}>
        <div className={styles.content__header}>
          <h2 className={styles.hero__title}>Welcome back, User</h2>
          <p className={styles.hero__text}>
            Each month, more than 3 million job seekers turn to website in their
            search for work, making over 140,000 applications every single day
          </p>
        </div>
        <div className={styles.content__boxes}>
          <Link href='/talent/profile' className={styles.content__box}>
            <h3 className={styles.box__title}>Complete Profile</h3>
            <p className={styles.box__text}>
              Add your profile picture, bio, skills, and experience
            </p>
          </Link>
          <div className={styles.content__box}>
            <h3 className={styles.box__title}>Send Application</h3>
            <p className={styles.box__text}>Apply for jobs and get hired</p>
          </div>
          <div className={styles.content__box}>
            <h3 className={styles.box__title}>Get Hired</h3>
            <p className={styles.box__text}>Get hired and start earning</p>
          </div>
        </div>
      </div>
    </section>
  );
}
