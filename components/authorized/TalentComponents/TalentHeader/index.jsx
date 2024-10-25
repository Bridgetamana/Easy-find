"use client";

import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import NotificationTab from "../Notifications";
import AccountDropdown from "../AccountDropdown";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";

export default function TalentHeader() {
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

  const closeNotifications = () => {
    setShowNotifications(false);
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
                href="/talent/"
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
                href="/talent/jobs"
                onClick={() => handleMenuClick("jobs")}
                className={`${styles.nav__link} ${
                  active === styles.jobs ? styles.active__link : ""
                }`}
              >
                Jobs
              </Link>
            </li>
            <li
              className={
                accountDropdown ? styles.active__menu : styles.nav__menu
              }
              onClick={toggleAccountDropdown}
            >
              Account
              <BsChevronDown fill="#827f7f" size={10} />
              <div
                className={`${
                  accountDropdown ? styles.account__modal : styles.no__show
                }`}
              >
                <AccountDropdown />
              </div>
            </li>
            <li className={styles.nav__item}>
              <Link
                href="/talent/blog"
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
          <Image
            src="/assets/images/EasyFind.svg"
            alt="Logo"
            sizes="100px"
            width={100}
            height={10}
            layout="fixed"
            className={styles.logo}
          />
        </div>
        <div className={styles.icons__wrap}>
          <button
            type="button"
            className={styles.menu__button}
            onClick={toggleNotifications}
          >
            <MdNotifications size={24} stroke="#2563eb" fill="#2563eb" />
          </button>
          <button
            type="button"
            className={styles.menu__button}
            onClick={toggleMenu}
          >
            <FiMenu size={24} stroke="#2563eb" fill="#2563eb" />
          </button>
        </div>
        <nav
          className={`${styles.nav__bar} ${
            showMenu ? styles.show__navbar : styles.nav__bar
          }`}
        >
          <div className="nav__header">
            <Image
              src="/assets/images/EasyFind.svg"
              alt="Logo"
              sizes="100px"
              width={100}
              height={10}
              className={styles.logo}
            />
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
            <li className={`${styles.nav__item} ${styles.pd_btm} `}>
              <Link
                href="/talent/"
                onClick={() => handleMenuClick("home")}
                className={`${styles.nav__link} ${
                  active === styles.home ? styles.active__link : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className={`${styles.nav__item} ${styles.pd_btm}`}>
              <Link
                href="/talent/jobs"
                onClick={() => handleMenuClick("jobs")}
                className={`${styles.nav__link} ${
                  active === styles.jobs ? styles.active__link : ""
                }`}
              >
                Jobs
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link
                href="/talent/companies"
                onClick={() => handleMenuClick("companies")}
                className={`${styles.nav__link} ${
                  active === styles.companies ? styles.active__link : ""
                }`}
              >
                Companies
              </Link>
            </li>
          </ul>
          <ul className={styles.dropdown__list}>
            <h4 className={styles.nav__head}>
              Account
              <BsChevronDown fill="#827f7f" size={10} />
            </h4>
            <li className={styles.dropdown__link}>
              <Link href="/talent/profile" className="link" onClick={closeMenu}>
                Profile
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link
                href="/talent/settings"
                className="link"
                onClick={closeMenu}
              >
                Settings
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link
                href="/talent/testimonials"
                className="link"
                onClick={closeMenu}
              >
                Testimonials
              </Link>
            </li>
          </ul>
          <ul className={styles.nav__list}>
            <li className={`${styles.nav__item} ${styles.pd_btm}`}>
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
        <div>
          <NotificationTab closeNotifications={closeNotifications} />
        </div>
      )}
    </header>
  );
}
