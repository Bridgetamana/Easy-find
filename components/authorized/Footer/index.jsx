import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";

export default function Footer() {
  return (
    <footer className={styles.authorized__footer}>
      <div className={styles.footer__bottom}>
        <div className={styles.footer__right}>
          <Image
            src="/assets/images/EasyFind.svg"
            alt="Logo"
            width={100}
            height={100}
            className={styles.logo}
          />
        </div>
        <p className={styles.footer__left}>
          &copy; {new Date().getFullYear()} EasyFind. All rights reserved
        </p>
      </div>
    </footer>
  );
}
