"use client";
import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import CompanyDropdown from "../AccountDropdown";
import Image from 'next/image';
import Link from "next/link";
import style from "./style.module.scss";

export default function CompanyHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [active, setActive] = useState(null);

  const handleMenuClick = (key) => {
    setActive(key);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdown(!accountDropdown);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const [isSticky, setIsSticky] = useState(false);
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
      className={`${style.authorized__header} ${
        isSticky ? style.sticky__menu : ""
      }`}
    >
      {/* Desktop Header */}
      <div className={style.desktop__header}>
        <div className={style.header__logo}>
          <Image
            src="/assets/images/EasyFind.svg"
            alt="Logo"
            sizes="100px"
            width={100}
            height={10}
            layout="fixed"
            className={style.logo}
          />
        </div>
        <nav className={style.nav__bar}>
          <ul className={style.nav__list}>
            <li className={style.nav__item}>
              <Link
                href="/company/"
                onClick={() => handleMenuClick("home")}
                className={`${style.nav__link} ${
                  active === style.home ? style.active__link : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li
              className={accountDropdown ? style.active__menu : style.nav__menu}
              onClick={toggleAccountDropdown}
            >
              Account
              <BsChevronDown fill="#827f7f" size={10} />
              <div
                className={`${
                  accountDropdown ? style.account__modal : style.no__show
                }`}
              >
                <CompanyDropdown />
              </div>
            </li>
            <li className={style.nav__item}>
              <Link
                href="/company/testimonials"
                onClick={() => handleMenuClick("jobs")}
                className={`${style.nav__link} ${
                  active === style.jobs ? style.active__link : ""
                }`}
              >
                Testimonials
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link
                href="/blog"
                onClick={() => handleMenuClick("blog")}
                className={`${style.nav__link} ${
                  active === style.blog ? style.active__link : ""
                }`}
              >
                Blog
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link href="/signout" className={style.nav__button}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className={style.mobile__header}>
        <div className={style.header__logo}>
          <h2 className={style.logo__name}>MinuJobs</h2>
        </div>
        <button
          type="button"
          className={style.menu__button}
          onClick={toggleMenu}
        >
          <FiMenu size={32} stroke="#2563eb" fill="#2563eb" />
        </button>
        <nav
          className={`${style.nav__bar} ${
            showMenu ? style.show__navbar : style.nav__bar
          }`}
        >
          <div className={style.nav__header}>
            <h2 className={style.logo__name}>MinuJobs</h2>
            <button
              type="button"
              className={style.close__menu}
              onClick={closeMenu}
            >
              <CgClose size={24} />
            </button>
          </div>
          {/* Navigation List */}
          <ul className={style.nav__list}>
            <li className={`${style.item} ${style.pd_btm} `}>
              <Link
                href="/company/"
                onClick={() => handleMenuClick("home")}
                className={`${style.nav__link} ${
                  active === style.home ? style.active__link : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link
                href="/company/testimonials"
                onClick={() => handleMenuClick("testimonials")}
                className={`${style.nav__link} ${
                  active === style.testimonials ? style.active__link : ""
                }`}
              >
                Testimonials
              </Link>
            </li>
          </ul>
          <ul className={style.dropdown__list}>
            <h4 className={style.nav__head}>
              Account
              <BsChevronDown fill="#827f7f" size={10} />
            </h4>
            <li className={style.dropdown__link}>
              <Link
                href="/company/profile"
                className={style.link}
                onClick={closeMenu}
              >
                Profile
              </Link>
            </li>
            <li className={style.dropdown__link}>
              <Link
                href="/company/dashboard"
                className={style.link}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            </li>
            <li className={style.dropdown__link}>
              <Link
                href="/company/settings"
                className={style.link}
                onClick={closeMenu}
              >
                Settings
              </Link>
            </li>
          </ul>
          <ul className={style.nav__list}>
            <li className={` ${style.nav__item} ${style.pd_btm} `}>
              <Link
                href="/blog"
                onClick={() => handleMenuClick("blog")}
                className={`${style.nav__link} ${
                  active === style.blog ? style.active__link : ""
                }`}
              >
                Blog
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link href="/signout" className={style.nav__button}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
