import React from "react";
import styles from "./style.module.scss";

export default function CompanyService() {
  return (
    <section className={styles.services__section}>
      <div className={styles.section__header}>
        <h2 className={styles.section__title}>Our Services/Products</h2>
      </div>

      <div className={styles.services__container}>
        <div className={styles.service__item}>
          <img
            src="/images/service1.jpg"
            alt="Service 1"
            className={styles.service__image}
          />
          <h3 className={styles.service__title}>Service/Product 1</h3>
          <p className={styles.service__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra diam non felis porttitor, vitae porta neque placerat. Sed ac
            velit quis lorem ultricies cursus sit amet sed dolor.
          </p>
          <button className={styles.service__button}>Learn More</button>
        </div>
        <div className={styles.service__item}>
          <img
            src="/images/service2.jpg"
            alt="Service 2"
            className={styles.service__image}
          />
          <h3 className={styles.service__title}>Service/Product 2</h3>
          <p className={styles.service__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra diam non felis porttitor, vitae porta neque placerat. Sed ac
            velit quis lorem ultricies cursus sit amet sed dolor.
          </p>
          <button className={styles.service__button}>Learn More</button>
        </div>
        <div className={styles.service__item}>
          <div className={styles.service__image}>
            <img src="/images/service3.jpg" alt="Service 3" />
          </div>
          <h3 className={styles.service__title}>Service/Product 3</h3>
          <p className={styles.service__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra diam non felis porttitor, vitae porta neque placerat. Sed ac
            velit quis lorem ultricies cursus sit amet sed dolor.
          </p>
          <button className={styles.service__button}>Learn More</button>
        </div>
      </div>
    </section>
  );
}
