import React from "react";
import "./style.scss";
import { BsCheck2Circle } from "react-icons/bs";

export default function RequiredSkills() {
  return (
    <section className="requiredSkills__section">
      <div className="skills__header">
        <h2 className="skills__title">
          Required Knowledge, Skills, and Abilities
        </h2>
      </div>
      <ul className="skills__list">
        <li className="skills__item">
          <p className="skills__text">
            <BsCheck2Circle fill="#2563eb" />
            Commitment – understanding the price and having the willingness to
            pay that price
          </p>
        </li>
        <li className="skills__item">
          <p className="skills__text">
            <BsCheck2Circle fill="#2563eb" />
            Courage – the ability to act in the face of fear
          </p>
        </li>
        <li className="skills__item">
          <p className="skills__text">
            <BsCheck2Circle fill="#2563eb" />
            You will drift aimlessly until you arrive back at the original dock
          </p>
        </li>
        <li className="skills__item">
          <p className="skills__text">
            <BsCheck2Circle fill="#2563eb" />
            You will run aground and become hopelessly stuck in the mud
          </p>
        </li>
      </ul>
    </section>
  );
}
