import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";

export default function CompanyDropdown({ closeMenu }) {
  return (
    <div className={styles.account__menu}>
      <ul className={styles.dropdown__list}>
        <li className={styles.dropdown__link}>
          <Link href="/company/profile" className={styles.link} onClick={closeMenu}>
            Profile
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/company/dashboard" className={styles.link} onClick={closeMenu}>
            Dashboard
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/company/settings" className={styles.link} onClick={closeMenu}>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
