import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";

export default function AccountDropdown() {
 
  return (
    <div className={styles.account__menu}>
      <ul className={styles.dropdown__list}>
        <li className={styles.dropdown__link}>
          <Link href="/talent/profile" className={styles.link}>
            Profile
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/talent/settings" className={styles.link}>
            Setting
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/talent/testimonials" className={styles.link}>
            Testimonials
          </Link>
        </li>
      </ul>
    </div>
  );
}
