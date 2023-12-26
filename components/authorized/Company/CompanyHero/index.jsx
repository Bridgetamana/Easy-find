import React from "react";
import "./style.scss";

export default function Hero() {
  return (
    <section className="hero__section">
      <div className="hero__content">
        <div className="content__header">
          <h2 className="hero__title">Welcome back, Company Name</h2>
          <p className="hero__text">
            Each month, more than 3 million job seekers turn to website in their
            search for work, making over 140,000 applications every single day
          </p>
        </div>
        <div className="content__boxes">
          <div className="content__box">
            <h3 className="box__title">Complete Profile</h3>
            <p className="box__text">
              Add your company logo, name and other important details needed.
            </p>
          </div>
          <div className="content__box">
            <h3 className="box__title">Post Job</h3>
            <p className="box__text">Make a job posting with all the necesary criterias you need.</p>
          </div>
          <div className="content__box">
            <h3 className="box__title">Hire talents</h3>
            <p className="box__text">Start hiring top talents to work for you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
