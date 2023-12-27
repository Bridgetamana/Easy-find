import React from "react";
import "./style.scss";

export default function Hero () {
  return (
    <section className="hero__section">
      <div className="hero__content">
        <div className="content__header">
          {/* <h2 className="hero__title">Welcome back, Lilian</h2> */}
          <p className="hero__text">
            Each month, more than 3 million job seekers turn to EasyFind website in their
            search for work, making over 140,000 applications every single day. You can be part of this number by creating an account with us. 
          </p>
        </div>
        <div className="content__boxes">
          <div className="content__box">
            <h3 className="box__title">Complete Profile</h3>
            <p className="box__text">
              Add your profile picture, bio, skills, and experience to your profile
            </p>
          </div>
          <div className="content__box">
            <h3 className="box__title">Send Application</h3>
            <p className="box__text">
              Apply for jobs posted by employers on EasyFind
              </p>
          </div>
          <div className="content__box">
            <h3 className="box__title">Get Hired</h3>
            <p className="box__text">Get hired and start earning from your dream job 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
