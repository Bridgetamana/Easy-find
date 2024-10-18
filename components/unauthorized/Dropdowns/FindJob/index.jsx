import Link from "next/link";
import styles from "./style.module.scss";


export default function FindJob() {
  
  return (
    <div className={styles.findJob__menu}>
      <ul className={styles.dropdown__list}>
        <li className={styles.dropdown__link}>
          <Link href="/browse-jobs" className={styles.link}>
            Browse Jobs
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/find-company" className={styles.link}>
            Find Companies
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/terms" className={styles.link}>
            Terms and Conditions
          </Link>
        </li>
      </ul>
    </div>
  );
}
