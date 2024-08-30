import React from "react";
import styles from "./style.module.scss";
import { BsCheck2Circle } from "react-icons/bs";

export default function RequiredSkills() {
  return (
    <section className={styles.requiredSkills__section}>
      <div className={styles.skills__header}>
        <h2 className={styles.skills__title}>
          Required Knowledge, Skills, and Abilities
        </h2>
      </div>
      <ul className={styles.skills__list}>
        <li className={styles.skills__item}>
          <p className={styles.skills__text}>
            <BsCheck2Circle fill="#2563eb" />
            Commitment – understanding the price and having the willingness to
            pay that price
          </p>
        </li>
        <li className={styles.skills__item}>
          <p className={styles.skills__text}>
            <BsCheck2Circle fill="#2563eb" />
            Courage – the ability to act in the face of fear
          </p>
        </li>
        <li className={styles.skills__item}>
          <p className={styles.skills__text}>
            <BsCheck2Circle fill="#2563eb" />
            You will drift aimlessly until you arrive back at the original dock
          </p>
        </li>
        <li className={styles.skills__item}>
          <p className={styles.skills__text}>
            <BsCheck2Circle fill="#2563eb" />
            You will run aground and become hopelessly stuck in the mud
          </p>
        </li>
      </ul>
    </section>
  );
}
