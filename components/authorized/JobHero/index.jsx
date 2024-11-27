import React, { useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import styles from './style.module.scss';

export default function JobHero({ setSearchInput }) {
  const [searchValue, setSearchValue] = useState(""); 

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); 
    setSearchInput(value); 
  };

  return (
    <div className={styles.jobHero__section}>
      <div className={styles.jobHero__content}>
        <h1 className={styles.hero__title}>
          Find your next career today within minutes.
        </h1>
        <p className={styles.hero__text}>
          We have over 100,000 jobs available for you
        </p>

        <div className={styles.hero__searchBar}>
          <input
            type="search"
            name="search-bar"
            className={styles.search__bar}
            placeholder="Job Title, Skill or Company"
            value={searchValue} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
    </div>
  );
}
