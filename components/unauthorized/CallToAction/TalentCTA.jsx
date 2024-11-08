import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

export default function TalentCTA() {
  return (
    <section className={styles.cta__section}>
      <div className={styles.cta__container} style={{
        backgroundImage: `url('./assets/images/cta-bg.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} >

        <div className={styles.cta__description}>
          <h3 className={styles.description}>
            EasyFind helps you to
            <br />
            find the right job.
          </h3>

          <Link href='/signin' className={styles.cta__button}>Get hired now</Link>
        </div>
      </div>
    </section>
  );
}
