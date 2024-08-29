"use client";
import React, { useState } from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import style from "./style.module.scss";

export default function TalentDetails() {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Hello there! My name is Jane Doe. I am a graphic designer, and I’m very passionate and dedicated to my work. With 20 years experience as a professional a graphic designer, I have acquired the skills and knowledge necessary to make your project a success.",
    profileImage:
      "https://ouch-cdn2.icons8.com/-JZptPGuKRXkyuzdLeFBi71mdKqKYQHlVYx_4AQFhdQ/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTIx/LzYyOTBlMmU4LWQ2/NmMtNDgzMS1hOWFl/LTUwNDQ3M2ZkMWZj/NS5wbmc.png",
    dob: "4, July 1990",
    gender: "Female",
    pronouns: "She/Her",
    jobTitle: "Frontend Developer",
    minSalary: "80,000",
    maxSalary: "120,000",
    linkedInLink: "https://www.linkedin.com/in/john-doe/",
    portfolioLink: "https://www.johndoe.com/",
    address: " Lorem Street, Ipsum, State, Country",
    phone: " 1234567890",
    mobile: " 1234567890",
    resume: null,
    skills: " HTML, CSS, JavaScript, React, Node.js",
    institute: "University of Toronto, Canada",
    degree: " Bachelor of Art",
    company: "Google",
    position: "Frontend Developer",
  });

  const {
    name,
    email,
    bio,
    profileImage,
    dob,
    gender,
    pronouns,
    jobTitle,
    minSalary,
    maxSalary,
    linkedInLink,
    portfolioLink,
    address,
    phone,
    mobile,
    resume,
    skills,
    degree,
    institute,
    company,
    position,
  } = formData;

  return (
    <section className={style.talent__detsPage}>
      <div className={style.details__container}>
        <div className={style.details__top}>
          <div className={style.details__column}>
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile"
                className={style.details__image}
              />
            )}

            <div className={style.details__row}>
              <h4 className={style.user__name}>{name}</h4>
              <p className={style.user__address}>
                <AiOutlineEnvironment />
                {address}
              </p>
            </div>
            <p className={style.user__title}>{jobTitle}</p>
          </div>
        </div>

        <div className={style.details__bottom}>
          <div className={style.details__box}>
            <h4 className={style.title}>Personal Details</h4>
            <p className={style.text}>
              <strong>Pronouns:</strong> {pronouns}
            </p>
            <p className={style.text}>
              <strong>Gender:</strong> {gender}
            </p>
            <p className={style.text}>
              <strong>DOB:</strong> {dob}
            </p>
          </div>

          <div className={style.details__box}>
            <h4 className={style.title}>About</h4>
            <p className={style.text}>{bio}</p>
          </div>

          <div className={style.details__box}>
            <h4 className={style.title}>Skills</h4>
            <p className={style.text}>{skills}</p>
          </div>

          <div className={style.details__box}>
            <h4 className={style.title}>Education</h4>
            <p className={style.text}>
              <strong>Institution: </strong>
              {institute}
            </p>
            <p className={style.text}>
              <strong>Degree: </strong>
              {degree}
            </p>
          </div>

          <div className={style.details__box}>
            <h4 className={style.title}>Experience</h4>
            <p className={style.text}>
              <strong>Company: </strong>
              {company}
            </p>
            <p className={style.text}>
              <strong>Position: </strong>
              {position}
            </p>
          </div>

          <div className={style.details__box}>
            <h4 className={style.title}>Contact</h4>
            <p className={style.text}>
              <strong>Email: </strong>
              {email}
            </p>
            <p className={style.text}>
              <strong>Phone: </strong>
              {phone}
            </p>
            <p className={style.text}>
              <strong>Mobile: </strong>
              {mobile}
            </p>
          </div>

          <div className={style.details__box}>
            <h4 className={style.title}>Social Links</h4>
            <p className={style.text}>
              <strong>LinkedIn:</strong> {linkedInLink}
            </p>
            <p className={style.text}>
              <strong>Portfolio:</strong> {portfolioLink}
            </p>
          </div>

          <div className={style.details__box}>
            <h4 className={style.title}>Resume*</h4>
            {resume === null ? (
              <p className={style.text}>No resume uploaded</p>
            ) : (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className={style.text}
              >
                View Resume
              </a>
            )}
          </div>

          <div className={style.details__box}>
            <h4 className={style.title}>Additional Information</h4>
            <p className={style.text}>
              <strong>Desired Salary:</strong> ${minSalary} - ${maxSalary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
