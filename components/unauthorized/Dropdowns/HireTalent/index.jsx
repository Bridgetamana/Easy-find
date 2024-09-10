import Link from "next/link";
import styles from "./style.module.scss";


export default function HireTalent() {
  return (
    <div className={styles.hireTalent__menu}>
      <ul className={styles.dropdown__list}>
        <li className={styles.dropdown__link}>
          <Link href="/company/dashboard/post-job" className={styles.link}>
            Post Jobs
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/terms" className={styles.link}>
            Terms
          </Link>
        </li>
      </ul>
    </div>
  );
}
