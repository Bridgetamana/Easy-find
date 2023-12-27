'use client'

import React, { useState } from "react";
import { AiOutlineClockCircle, AiOutlineEnvironment } from "react-icons/ai";
import { BiBadgeCheck } from "react-icons/bi";
import "./style.scss";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsCheck2Circle, BsHeart } from "react-icons/bs";
import Link from "next/link";

export default function JobDetails() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="jobDetails__section">
      <div className="details__header">
        <h2 className="details__title">Senior Full-stack Developer</h2>
        <div className="details__flex">
          <p className="details__type">
            <AiOutlineEnvironment fill="#9d9d9d" />
            Full-time
          </p>
          <p className="details__posted">
            <AiOutlineClockCircle fill="#9d9d9d" />3 days ago
          </p>
        </div>
        <button className="save__button" onClick={handleSaveJob}>
          {isSaved ? (
            <BsHeartFill fill="#ff0000" />
          ) : (
            <BsHeart fill="#e0e6f7" />
          )}
          Save Job
        </button>
      </div>

      {/* <JobOverview/> */}
      <section className="employmentInfo__section">
        <div className="info__header">
          <p className="info__title">Employment Information</p>
        </div>

        <div className="info__content">
          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Industry</p>
            </div>
            <div className="info__right">
              <div className="info__text">
                Mechanical / Auto / Automotive, Civil / Construction
              </div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Job level</p>
            </div>
            <div className="info__right">
              <div className="info__text">Entry Level</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Qualification</p>
            </div>
            <div className="info__right">
              <div className="info__text">Bachelor's Degree</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Salary</p>
            </div>
            <div className="info__right">
              <div className="info__text">$500 - $1000</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Experience</p>
            </div>
            <div className="info__right">
              <div className="info__text">1 year</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Job type</p>
            </div>
            <div className="info__right">
              <div className="info__text">Full-time</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Deadline</p>
            </div>
            <div className="info__right">
              <div className="info__text">30/10/2021</div>
            </div>
          </div>

          <div className="info__item">
            <div className="info__left">
              <span className="info__icon">
                <HiOutlineBuildingOffice2 />
              </span>
              <p className="info__title">Location</p>
            </div>
            <div className="info__right">
              <div className="info__text">San Gwann, Remote</div>
            </div>
          </div>
        </div>
      </section>

      {/* <CompanyDescription/> */}
      <section className="companyDescription__section">
        <div className="description__header">
          <h2 className="description__title">About Company</h2>
        </div>
        <p className="description__text">
          One of the main areas that I work on with my clients is shedding these
          non-supportive beliefs and replacing them with beliefs that will help
          them to accomplish their desires. It is truly amazing the damage that
          we, as parents, can inflict on our children. So why do we do it? For
          the most part, we don’t do it intentionally or with malice.
          <br /> <br />
          In the majority of cases, the cause is a well-meaning but unskilled or
          un-thinking parent, who says the wrong thing at the wrong time, and
          the message sticks – as simple as that!
        </p>
      </section>

      {/* <JobDescription/> */}
      <section className="companyDescription__section">
        <div className="description__header">
          <h2 className="description__title">Job Description</h2>
        </div>
        <p className="description__text">
          One of the main areas that I work on with my clients is shedding these
          non-supportive beliefs and replacing them with beliefs that will help
          them to accomplish their desires. It is truly amazing the damage that
          we, as parents, can inflict on our children. So why do we do it? For
          the most part, we don’t do it intentionally or with malice.
        </p>
      </section>

      {/* <RequiredSkills/> */}
      <section className="requiredSkills__section">
        <div className="skills__header">
          <h2 className="skills__title">
            Required Knowledge, Skills, and Abilities
          </h2>
        </div>
        <div className="skills__content">
          <ul className="skills__list">
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                Commitment – understanding the price and having the willingness
                to pay that price
              </p>
            </li>
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                Courage – the ability to act in the face of fear
              </p>
            </li>
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                You will drift aimlessly until you arrive back at the original
                dock
              </p>
            </li>
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                You will run aground and become hopelessly stuck in the mud
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="requiredSkills__section">
        <div className="skills__header">
          <h2 className="skills__title">
            Education + Experience
          </h2>
        </div>
        <div className="skills__content">
          <ul className="skills__list">
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                You will sail along until you collide with an immovable object, after which you will sink to the bottom.
              </p>
            </li>
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                Clarity – developing the Vision
              </p>
            </li>
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                Give yourself the power of responsibility. Remind yourself the only thing stopping you is yourself.
              </p>
            </li>
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                Do it today. Remind yourself of someone you know who died suddenly and the fact that there is no guarantee that tomorrow will come.
              </p>
            </li>
          </ul>
        </div>
      </section>

        {/* <JobBenefits/> */}
        <section className="requiredSkills__section">
        <div className="skills__header">
          <h2 className="skills__title">
            Job Benefits
          </h2>
        </div>
        <div className="skills__content">
          <ul className="skills__list">
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                You will sail along until you collide with an immovable object, after which you will sink to the bottom.
              </p>
            </li>
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                Clarity – developing the Vision
              </p>
            </li>
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                Give yourself the power of responsibility. Remind yourself the only thing stopping you is yourself.
              </p>
            </li>
            <li className="skills__item">
              <p className="skills__text">
                <BsCheck2Circle fill="#66789c" />
                Do it today. Remind yourself of someone you know who died suddenly and the fact that there is no guarantee that tomorrow will come.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Application Button */}
      {/* <Link href={`/apply/${job.id}`}> */}
      <Link href='/application'>
      <button className="apply__button">
        <BiBadgeCheck fill="#fff" />
        Apply Now
        </button>
      </Link>
    </div>
  );
}

