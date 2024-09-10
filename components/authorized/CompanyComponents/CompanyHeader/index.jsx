"use client";
import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import CompanyDropdown from "../AccountDropdown";
import NotificationTab from "../Notifications";
import Image from 'next/image';
import Link from "next/link";
import styles from "./style.module.scss";

export default function CompanyHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [active, setActive] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleMenuClick = (key) => {
    setActive(key);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdown(!accountDropdown);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const shouldBeSticky = scrollTop > 150;

      setIsSticky(shouldBeSticky);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <header
      className={`${styles.authorized__header} ${
        isSticky ? styles.sticky__menu : ""
      }`}
    >
      {/* Desktop Header */}
      <div className={styles.desktop__header}>
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
        <nav className={styles.nav__bar}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link
                href="/company/"
                onClick={() => handleMenuClick("home")}
                className={`${styles.nav__link} ${
                  active === styles.home ? styles.active__link : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li
              className={accountDropdown ? styles.active__menu : styles.nav__menu}
              onClick={toggleAccountDropdown}
            >
              Account
              <BsChevronDown fill="#827f7f" size={10} />
              <div
                className={`${
                  accountDropdown ? styles.account__modal : styles.no__show
                }`}
              >
                <CompanyDropdown />
              </div>
            </li>
            <li className={styles.nav__item}>
              <Link
                href="/company/testimonials"
                onClick={() => handleMenuClick("jobs")}
                className={`${styles.nav__link} ${
                  active === styles.jobs ? styles.active__link : ""
                }`}
              >
                Testimonials
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link
                href="/blog"
                onClick={() => handleMenuClick("blog")}
                className={`${styles.nav__link} ${
                  active === styles.blog ? styles.active__link : ""
                }`}
              >
                Blog
              </Link>
            </li>
            <li className={styles.nav__item}>
            <button
          type="button"
          className={styles.menu__button}
          onClick={toggleNotifications}
        >
          <MdNotifications size={24} stroke="#2563eb" fill="#2563eb" />
          </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className={styles.mobile__header}>
        <div className={styles.header__logo}>
          <h2 className={styles.logo__name}>EasyFind</h2>
        </div>
        <div>
          <button
          type="button"
          className={styles.menu__button}
          onClick={toggleNotifications}
        >
          <MdNotifications size={32} stroke="#2563eb" fill="#2563eb" />
          </button>
          <button
          type="button"
          className={styles.menu__button}
          onClick={toggleMenu}
        >
          <FiMenu size={32} stroke="#2563eb" fill="#2563eb" />
          </button>
        </div>
        <nav
          className={`${styles.nav__bar} ${
            showMenu ? styles.show__navbar : styles.nav__bar
          }`}
        >
          <div className={styles.nav__header}>
            <h2 className={styles.logo__name}>EasyFind</h2>
            <button
              type="button"
              className={styles.close__menu}
              onClick={closeMenu}
            >
              <CgClose size={24} />
            </button>
          </div>
          {/* Navigation List */}
          <ul className={styles.nav__list}>
            <li className={`${styles.item} ${styles.pd_btm} `}>
              <Link
                href="/company/"
                onClick={() => handleMenuClick("home")}
                className={`${styles.nav__link} ${
                  active === styles.home ? styles.active__link : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link
                href="/company/testimonials"
                onClick={() => handleMenuClick("testimonials")}
                className={`${styles.nav__link} ${
                  active === styles.testimonials ? styles.active__link : ""
                }`}
              >
                Testimonials
              </Link>
            </li>
          </ul>
          <ul className={styles.dropdown__list}>
            <h4 className={styles.nav__head}>
              Account
              <BsChevronDown fill="#827f7f" size={10} />
            </h4>
            <li className={styles.dropdown__link}>
              <Link
                href="/company/profile"
                className={styles.link}
                onClick={closeMenu}
              >
                Profile
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link
                href="/company/dashboard"
                className={styles.link}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link
                href="/company/settings"
                className={styles.link}
                onClick={closeMenu}
              >
                Settings
              </Link>
            </li>
          </ul>
          <ul className={styles.nav__list}>
            <li className={` ${styles.nav__item} ${styles.pd_btm} `}>
              <Link
                href="/blog"
                onClick={() => handleMenuClick("blog")}
                className={`${styles.nav__link} ${
                  active === styles.blog ? styles.active__link : ""
                }`}
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {showNotifications && (
          <div className={styles.notification__dropdown}>
            <NotificationTab />
          </div>
        )}
    </header>
  );
}
