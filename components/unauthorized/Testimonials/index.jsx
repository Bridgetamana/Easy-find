import React, { useState, useRef } from "react";
import Slider from "react-slick";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./style.scss";

const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget sapien nisl. Proin ut hendrerit sapien.",
    company: "ABC Company",
  },
  {
    id: 2,
    name: "Jane Smith",
    testimonial:
      "Sed quis mauris quis nunc interdum tristique. Vivamus posuere enim eget purus placerat, eget molestie ex iaculis.",
    company: "XYZ Corporation",
  },
  {
    id: 3,
    name: "Jane Smith",
    testimonial:
      "Sed quis mauris quis nunc interdum tristique. Vivamus posuere enim eget purus placerat, eget molestie ex iaculis.",
    company: "XYZ Corporation",
  },
  {
    id: 4,
    name: "Jane Smith",
    testimonial:
      "Sed quis mauris quis nunc interdum tristique. Vivamus posuere enim eget purus placerat, eget molestie ex iaculis.",
    company: "XYZ Corporation",
  },
  {
    id: 5,
    name: "Jane Smith",
    testimonial:
      "Sed quis mauris quis nunc interdum tristique. Vivamus posuere enim eget purus placerat, eget molestie ex iaculis.",
    company: "XYZ Corporation",
  },
  {
    id: 6,
    name: "Jane Smith",
    testimonial:
      "Sed quis mauris quis nunc interdum tristique. Vivamus posuere enim eget purus placerat, eget molestie ex iaculis.",
    company: "XYZ Corporation",
  },
  {
    id: 7,
    name: "Jane Smith",
    testimonial:
      "Sed quis mauris quis nunc interdum tristique. Vivamus posuere enim eget purus placerat, eget molestie ex iaculis.",
    company: "XYZ Corporation",
  },
  // Add more testimonials here
];

export default function TestimonialsSection() {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false, // Remove the dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setActiveSlide(current),
    className: "testimonials__slider",
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <section className="testimonials__section">
      <div className="testimonials__container">
        <div className="section__header">
          <h2 className="section__title">Testimonials</h2>
          <p className="section__subtitle">Let's know what our clients say about us</p>
        </div>
        <div className="testimonials__navigation">
          <button className="testimonials__prev" onClick={goToPrevSlide}>
            <HiOutlineArrowNarrowLeft />
          </button>
          <button className="testimonials__next" onClick={goToNextSlide}>
            <HiOutlineArrowNarrowRight />
          </button>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="testimonials__slide">
              <div className="testimonials__content">
                <FaQuoteLeft className="icon__left" />
                <div className="content__img">
                  <img src="http://themes.potenzaglobalsolutions.com/html/jobber/images/avatar/04.jpg" alt="testifier profile" />
                </div>
                <p className="testimonials__name">{testimonial.name}</p>
                <p className="testimonials__company">{testimonial.company}</p>
                <p className="testimonials__testimonial">{testimonial.testimonial}</p>
                <FaQuoteRight className="icon__right" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}