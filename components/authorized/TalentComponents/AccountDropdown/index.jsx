import React from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";

export default function AccountDropdown() {
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
          <Link href="/talent/profile" className={styles.link}>
            Profile
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/talent/settings" className={styles.link}>
            Settings
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <button onClick={signOut} className={`${styles.link} ${styles.signout}`}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
