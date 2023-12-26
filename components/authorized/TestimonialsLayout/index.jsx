import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./style.scss";

export default function TestimonialsLayout({ data, handleClick, handleNextClick, handlePreviousClick, currentPage, pageNumbers }) {
  return (
    <section className="testimonials__page">
      <div className="testimonials__container">
        <div className="section__header">
          <h2 className="section__title">Testimonials</h2>
          <p className="section__subtitle">
            Let's know what our clients say about us
          </p>
        </div>
        <div className="testimonials__slide">
        {data.map((testimonial) => (
            <div key={testimonial.id}  className="testimonials__content">
              <FaQuoteLeft className="icon__left" />
              <div className="content__img">
                <img
                  src="http://themes.potenzaglobalsolutions.com/html/jobber/images/avatar/04.jpg"
                  alt="testifier profile"
                />
              </div>
              <p className="testimonials__name">{testimonial.name}</p>
              <p className="testimonials__company">{testimonial.company}</p>
              <p className="testimonials__testimonial">
                {testimonial.testimonial}
              </p>
              <FaQuoteRight className="icon__right" />
            </div>
        ))}
        </div>
        {/* Pagination */}
        <div className="pagination">
          <button
            className="pagination__button"
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                className={`pagination__button ${
                  currentPage === pageNumber ? "pagination__active" : ""
                }`}
                key={pageNumber}
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            className="pagination__button"
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
