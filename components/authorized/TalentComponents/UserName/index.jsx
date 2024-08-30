import React from "react";
import styles from "./style.module.scss";

export default function UserName ({

}) {
  return (
    <section className={styles.username__section}>
      <div className={styles.username__content}>
        <div className={styles.content__header}>
          <h2 className={styles.username__title}>Welcome back, Lilian!</h2>
        </div>
      </div>
    </section>
  );
}
