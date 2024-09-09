import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import Link from "next/link";
import HireTalent from "../Dropdowns/HireTalent";
import FindJob from "../Dropdowns/FindJob";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Button from "@/components/utils/Button";
import Image from "next/image";
import styles from './style.module.scss';

export default function UnauthorizedHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [jobDropdown, setJobDropdown] = useState(false);
  const [hireDropdown, setHireDropdown] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleJobDropdown = () => {
    setJobDropdown(!jobDropdown);
    setHireDropdown(false); // Close the hireDropdown
  };

  const toggleHireDropdown = () => {
    setHireDropdown(!hireDropdown);
    setJobDropdown(false); // Close the jobDropdown
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className={styles.unauthorized__header}>
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
            <li
              className={jobDropdown ? styles.active__menu : styles.nav__menu}
              onClick={toggleJobDropdown}
            >
              Find job
              <BsChevronDown fill="#827f7f" size={10} />
              <div className={jobDropdown ? styles.findJob_modal : styles.no__show}>
                <FindJob />
              </div>
            </li>
            <li
              className={hireDropdown ? styles.active__menu : styles.nav__menu}
              onClick={toggleHireDropdown}
            >
              Hire talent
              <BsChevronDown fill="#827f7f" size={10} />
              <div className={hireDropdown ? styles.hireTalent__modal : styles.no__show}>
                <HireTalent />
              </div>
            </li>
            <li className={styles.nav__item}>
              <Link href="/blog" className={styles.nav__link}>
                Blog
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

          {/* Navigation List */}
          <ul className={styles.dropdown__list}>
            <h4 className={styles.nav__head}>
              Find job
              <BsChevronDown fill="#827f7f" size={10} />
            </h4>
            <li className={styles.dropdown__link}>
              <Link href="/easy-find" className={styles.link}>
                How Minu works
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link href="/become-talent" className={styles.link}>
                Become a Talent
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link href="/terms" className={styles.link}>
                Terms
              </Link>
            </li>
          </ul>

          <ul className={styles.dropdown__list}>
            <h4 className={styles.nav__head}>
              Hire talent
              <BsChevronDown fill="#827f7f" size={10} />
            </h4>
            <li className={styles.dropdown__link}>
              <Link href="/settings" className={styles.link}>
                Post Jobs
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link href="/become-member" className={styles.link}>
                Partnership
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link href="/terms" className={styles.link}>
                Terms
              </Link>
            </li>
          </ul>

          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link href="/blog" className={styles.nav__link}>
                Blog
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
    </header>
  );
}