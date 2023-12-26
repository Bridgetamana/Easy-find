import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import './style.scss';

export default function JobHero() {
  return (
    <div className="jobHero__section">
        <div className="jobHero__content">
        <h1 className="hero__title">Find your dream job</h1>
        <p className="hero__text">
          We have over 100,000 jobs available for you
        </p>
        
        <div className="hero__searchBar">
          <input
            type="search"
            name="search-bar"
            className="search__bar"
            placeholder="Job Title, Skill or Company"
          />
          <Link href="/search" className="hero__button">
            <HiOutlineArrowNarrowRight className="search__icon" />
            <p>Find Jobs</p>
          </Link>
        </div>
        </div>
    </div>
  )
}
