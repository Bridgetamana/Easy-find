"use client";
import React, { useState, useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import CompanyDropdown from "../AccountDropdown";
import NotificationTab from "../Notifications";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";

export default function CompanyHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [active, setActive] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  
  const menuRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  const handleMenuClick = (key) => {
    setActive(key);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const toggleAccountDropdown = (e) => {
    e.stopPropagation();
    setAccountDropdown(!accountDropdown);
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const signOut = () => {
    const router = useRouter();
    // Clear token before redirecting to signi page
    secureLocalStorage.removeItem("userToken");
    router.push("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setAccountDropdown(false);
      }
      
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              ref={accountDropdownRef}
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
                <CompanyDropdown />
              </div>
            </li>
            <li className={styles.nav__item}>
              <Link
                href="/company/jobs"
                onClick={() => handleMenuClick("blog")}
                className={`${styles.nav__link} ${
                  active === styles.blog ? styles.active__link : ""
                }`}
              >
                Jobs
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link
                href="/company/jobs/postjobs"
                className={styles.nav__button}
              >
                Post Job
              </Link>
            </li>
            <li ref={notificationsRef} className={styles.nav__item}>
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
                className={styles.link}
                onClick={closeMenu}
              >
                Home
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
                href="/company/settings"
                className={styles.link}
                onClick={closeMenu}
              >
                Settings
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link
                href="/company/terms"
                className={styles.link}
                onClick={closeMenu}
              >
                Terms
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <Link href="/blog" onClick={closeMenu} className={styles.link}>
                Blog
              </Link>
            </li>
            <li className={styles.dropdown__link}>
              <button
                onClick={signOut}
                className={`${styles.link} ${styles.signout}`}
              >
                Sign Out
              </button>
            </li>
          </ul>
          <ul className={styles.nav__list}>
            <li className={` ${styles.nav__item} ${styles.pd_btm} `}>
              <Link
                href="/company/jobs"
                onClick={() => handleMenuClick("blog")}
                className={`${styles.nav__link} ${
                  active === styles.blog ? styles.active__link : ""
                }`}
              >
                Jobs
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link
                href="/company/jobs/postjobs"
                className={styles.nav__button}
              >
                Post Job
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {showNotifications && (
        <div ref={notificationsRef}>
          <NotificationTab closeNotifications={closeNotifications} />
        </div>
      )}
    </header>
  );
}