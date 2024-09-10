import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { RxDividerVertical } from "react-icons/rx";
import Button from '../../utils/Button';
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import styles from './style.module.scss';

export default function BlogHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className={styles.blog__header}>
      {/* Desktop Header */}
      <div className={styles.desktop__header}>
        <Link href="/" className={styles.header__logo}>
          <Image
            src="/assets/images/EasyFind.svg"
            alt="Logo"
            sizes="100px"
            width={100}
            height={10}
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav__bar}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link href="/" className={styles.nav__link}>
                Home
              </Link>
            </li>
            <RxDividerVertical size={24} />
            <li className={styles.nav__item}>
              <Link href="/signin" className={styles.nav__link}>
                Sign In
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/signup" passHref>
                <Button
                  type="button"
                  title="Get Started"
                  variant={styles.nav__button}
                  icon={<HiOutlineArrowNarrowRight className={styles.search__icon} />}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className={styles.mobile__header}>
        <div className={styles.header__logo}>
          <Image
            src="/assets/images/EasyFind.svg"
            alt="Logo"
            sizes="100px"
            width={100}
            height={10}
            className={styles.logo}
          />
        </div>
        <button type="button" className={styles.menu__button} onClick={toggleMenu}>
          <FiMenu size={32} stroke="#2563eb" fill="#2563eb" />
        </button>

        <nav className={`${styles.nav__bar} ${showMenu ? styles.show__navbar : ''}`}>
          <div className={styles.nav__header}>
            <Link href="/" className={styles.header__logo}>
              <Image
                src="/assets/images/EasyFind.svg"
                alt="Logo"
                sizes="100px"
                width={100}
                height={10}
                className={styles.logo}
              />
            </Link>
            <button type="button" className={styles.close__menu} onClick={closeMenu}>
              <CgClose size={20} />
            </button>
          </div>

          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link href="/" className={styles.nav__link}>
                Home
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/signin" className={styles.nav__link}>
                Sign In
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/signup" className={styles.nav__button}>
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <nav className={styles.category__nav}>
        <Link href="/blog" className={`${styles.category__Link} sm:text-sm`}>All</Link>
        <Link href="/blog?category=job-application" className={`${styles.category__Link} sm:text-sm`}>Job Application</Link>
        <Link href="/blog?category=resume-tips" className={`${styles.category__Link} sm:text-sm`}>Resume Tips</Link>
        <Link href="/blog?category=getting-a-job" className={`${styles.category__Link} sm:text-sm`}>Getting a Job</Link>
      </nav>
    </header>
  );
}
