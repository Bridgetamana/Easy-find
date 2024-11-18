import React from "react";
import styles from "./style.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero__section}>
      <div className={styles.hero__content}>
        <div className={styles.content__header}>
          <p className={styles.hero__text}>
            Each month, more than 3 million job seekers turn to website in their
            search for work, making over 140,000 applications every single day
          </p>
        </div>
        <div className={styles.content__boxes}>
          <div className={styles.content__box}>
            <h3 className={styles.box__title}>Complete Profile</h3>
            <p className={styles.box__text}>
              Add your company logo, name and other important details needed.
            </p>
          </div>
          <div className={styles.content__box}>
            <h3 className={styles.box__title}>Post Job</h3>
            <p className={styles.box__text}>
              Make a job posting with all the necesary criterias you need.
            </p>
          </div>
          <div className={styles.content__box}>
            <h3 className={styles.box__title}>Hire talents</h3>
            <p className={styles.box__text}>
              Start hiring top talents to work for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
