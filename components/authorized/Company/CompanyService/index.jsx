import React from "react";
import "./style.scss";

export default function CompanyService() {
  return (
    <section className="services__section">
      <div className="section__header">
        <h2 className="section__title">Our Services/Products</h2>
      </div>
     
      <div className="services__container">
        <div className="service__item">
          <img
            src="/images/service1.jpg"
            alt="Service 1"
            className="service__image"
          />
          <h3 className="service__title">Service/Product 1</h3>
          <p className="service__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra diam non felis porttitor, vitae porta neque placerat. Sed ac
            velit quis lorem ultricies cursus sit amet sed dolor.
          </p>
          <button className="service__button">Learn More</button>
        </div>
        <div className="service__item">
          <img
            src="/images/service2.jpg"
            alt="Service 2"
            className="service__image"
          />
          <h3 className="service__title">Service/Product 2</h3>
          <p className="service__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra diam non felis porttitor, vitae porta neque placerat. Sed ac
            velit quis lorem ultricies cursus sit amet sed dolor.
          </p>
          <button className="service__button">Learn More</button>
        </div>
        <div className="service__item">
            <div className="service__image">
                <img
                    src="/images/service3.jpg"
                    alt="Service 3"
                />
            </div>
          <h3 className="service__title">Service/Product 3</h3>
          <p className="service__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            viverra diam non felis porttitor, vitae porta neque placerat. Sed ac
            velit quis lorem ultricies cursus sit amet sed dolor.
          </p>
          <button className="service__button">Learn More</button>
        </div>
      </div>
    </section>
  );
}
