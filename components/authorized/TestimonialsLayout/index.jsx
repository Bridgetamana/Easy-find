import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./style.module.scss";

export default function TestimonialsLayout({ data, handleClick, handleNextClick, handlePreviousClick, currentPage, pageNumbers }) {
  return (
    <section className={styles.testimonials__page}>
      <div className={styles.testimonials__container}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Testimonials</h2>
          <p className={styles.section__subtitle}>
            Let's know what our clients say about us
          </p>
        </div>
        <div className={styles.testimonials__slide}>
          {data.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonials__content}>
              <FaQuoteLeft className={styles.icon__left} />
              <div className={styles.content__img}>
                <img
                  src="http://themes.potenzaglobalsolutions.com/html/jobber/images/avatar/04.jpg"
                  alt="testifier profile"
                />
              </div>
              <p className={styles.testimonials__name}>{testimonial.name}</p>
              <p className={styles.testimonials__company}>
                {testimonial.company}
              </p>
              <p className={styles.testimonials__testimonial}>
                {testimonial.testimonial}
              </p>
              <FaQuoteRight className={styles.icon__right} />
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            className={styles.pagination__button}
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                className={`${pagination__button} ${
                  currentPage === pageNumber ? styles.pagination__active : ""
                }`}
                key={pageNumber}
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            className={styles.pagination__button}
            onClick={handleNextClick}
            disabled={currentPage === pageNumbers}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
