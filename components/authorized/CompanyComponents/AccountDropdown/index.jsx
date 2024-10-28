import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";


export default function CompanyDropdown({ closeMenu }) {
  const router = useRouter();
  
  const signOut = () => {

  // Clear token before redirecting to signi page
  secureLocalStorage.removeItem("userToken");
  router.push("/signin");
  };
  return (
    <div className={styles.account__menu}>
      <ul className={styles.dropdown__list}>
        <li className={styles.dropdown__link}>
          <Link
            href="/company/profile"
            className={styles.link}
            onClick={closeMenu}
          >
            Profile
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link
            href="/company/settings"
            className={styles.link}
            onClick={closeMenu}
          >
            Settings
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link
            href="/company/jobs"
            className={styles.link}
            onClick={closeMenu}
          >
            Jobs
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link
            href="/company/terms"
            className={styles.link}
            onClick={closeMenu}
          >
            Terms
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <button
            onClick={signOut}
            className={`${styles.link} ${styles.signout}`}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
