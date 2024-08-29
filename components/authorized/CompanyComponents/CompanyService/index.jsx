import React from "react";
import style from "./style.module.scss";

export default function CompanyService() {
  return (
    <section className={style.services__section}>
      <div className={style.section__header}>
        <h2 className={style.section__title}>Our Services/Products</h2>
      </div>

      <div className={style.services__container}>
        <div className={style.service__item}>
          <img
            src="/images/service1.jpg"
            alt="Service 1"
            className={style.service__image}
          />
          <h3 className={style.service__title}>Service/Product 1</h3>
          <p className={style.service__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra diam non felis porttitor, vitae porta neque placerat. Sed ac
            velit quis lorem ultricies cursus sit amet sed dolor.
          </p>
          <button className={style.service__button}>Learn More</button>
        </div>
        <div className={style.service__item}>
          <img
            src="/images/service2.jpg"
            alt="Service 2"
            className={style.service__image}
          />
          <h3 className={style.service__title}>Service/Product 2</h3>
          <p className={style.service__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra diam non felis porttitor, vitae porta neque placerat. Sed ac
            velit quis lorem ultricies cursus sit amet sed dolor.
          </p>
          <button className={style.service__button}>Learn More</button>
        </div>
        <div className={style.service__item}>
          <div className={style.service__image}>
            <img src="/images/service3.jpg" alt="Service 3" />
          </div>
          <h3 className={style.service__title}>Service/Product 3</h3>
          <p className={style.service__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra diam non felis porttitor, vitae porta neque placerat. Sed ac
            velit quis lorem ultricies cursus sit amet sed dolor.
          </p>
          <button className={style.service__button}>Learn More</button>
        </div>
      </div>
    </section>
  );
}
