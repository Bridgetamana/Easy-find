import React from "react";
import styles from "./style.module.scss";

export default function CompanyDescription() {
  return (
    <section className={styles.companyDescription__section}>
      <div className={styles.description__header}>
        <h2 className={styles.description__title}>About Company</h2>
      </div>
      <p className={styles.description__text}>
        One of the main areas that I work on with my clients is shedding these
        non-supportive beliefs and replacing them with beliefs that will help
        them to accomplish their desires. It is truly amazing the damage that
        we, as parents, can inflict on our children. So why do we do it? For the
        most part, we don’t do it intentionally or with malice.
        <br /> <br />
        In the majority of cases, the cause is a well-meaning but unskilled or
        un-thinking parent, who says the wrong thing at the wrong time, and the
        message sticks – as simple as that!
      </p>
    </section>
  );
}
