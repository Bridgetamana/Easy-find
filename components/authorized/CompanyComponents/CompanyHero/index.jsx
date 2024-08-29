import React from "react";
import style from "./style.module.scss";

export default function Hero() {
  return (
    <section className={style.hero__section}>
      <div className={style.hero__content}>
        <div className={style.content__header}>
          <h2 className={style.hero__title}>Welcome back, Company Name</h2>
          <p className={style.hero__text}>
            Each month, more than 3 million job seekers turn to website in their
            search for work, making over 140,000 applications every single day
          </p>
        </div>
        <div className={style.content__boxes}>
          <div className={style.content__box}>
            <h3 className={style.box__title}>Complete Profile</h3>
            <p className={style.box__text}>
              Add your company logo, name and other important details needed.
            </p>
          </div>
          <div className={style.content__box}>
            <h3 className={style.box__title}>Post Job</h3>
            <p className={style.box__text}>
              Make a job posting with all the necesary criterias you need.
            </p>
          </div>
          <div className={style.content__box}>
            <h3 className={style.box__title}>Hire talents</h3>
            <p className={style.box__text}>
              Start hiring top talents to work for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
