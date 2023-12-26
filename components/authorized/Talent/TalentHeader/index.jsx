"use client";
import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import AccountDropdown from "../AccountDropdown";
import Link from "next/link";
import "./style.scss";

export default function TalentHeader() {
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
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldBeSticky = scrollTop > 150;

      setIsSticky(shouldBeSticky);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`authorized__header ${isSticky ? "sticky__menu" : ""}`}>
      {/* Desktop Header */}
      <div className="desktop__header">
        <div className="header__logo">
          <h2 className="logo__name">MinuJobs</h2>
        </div>
        <nav className="nav__bar">
          <ul className="nav__list">
            <li className="nav__item">
              <Link
                href="/talent/"
                onClick={() => handleMenuClick("home")}
                className={`nav__link ${active === "home" ? "active__link" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav__item">
              <Link
                href="/talent/jobs"
                onClick={() => handleMenuClick("jobs")}
                className={`nav__link ${active === "jobs" ? "active__link" : ""}`}
              >
                Jobs
              </Link>
            </li>
            <li className="nav__item">
              <Link
                href="/talent/companies"
                onClick={() => handleMenuClick("companies")}
                className={`nav__link ${active === "companies" ? "active__link" : ""}`}
              >
                Companies
              </Link>
            </li>
            <li
              className={accountDropdown ? "active__menu" : "nav__menu"}
              onClick={toggleAccountDropdown}
            >
              Account
              <BsChevronDown fill="#827f7f" size={10} />
              <div className={`${accountDropdown ? "account__modal" : "no__show"}`}>
                <AccountDropdown />
              </div>
            </li>
            <li className="nav__item">
              <Link
                href="/blog"
                onClick={() => handleMenuClick("blog")}
                className={`nav__link ${active === "blog" ? "active__link" : ""}`}
              >
                Blog
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/signout" className="nav__button">
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="mobile__header">
        <div className="header__logo">
          <h2 className="logo__name">MinuJobs</h2>
        </div>
        <button type="button" className="menu__button" onClick={toggleMenu}>
          <FiMenu size={32} stroke="#2563eb" fill="#2563eb" />
        </button>
        <nav className={`nav__bar ${showMenu ? "show__navbar" : "nav__bar"}`}>
          <div className="nav__header">
            <h2 className="logo__name">MinuJobs</h2>
            <button type="button" className="close__menu" onClick={closeMenu}>
              <CgClose size={24} />
            </button>
          </div>
          {/* Navigation List */}
          <ul className="nav__list">
            <li className="nav__item pd_btm">
              <Link
                href="/talent/"
                onClick={() => handleMenuClick("home")}
                className={`nav__link ${active === "home" ? "active__link" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav__item  pd_btm">
              <Link
                href="/talent/jobs"
                onClick={() => handleMenuClick("jobs")}
                className={`nav__link ${active === "jobs" ? "active__link" : ""}`}
              >
                Jobs
              </Link>
            </li>
            <li className="nav__item">
              <Link
                href="/talent/companies"
                onClick={() => handleMenuClick("companies")}
                className={`nav__link ${active === "companies" ? "active__link" : ""}`}
              >
                Companies
              </Link>
            </li>
          </ul>
          <ul className="dropdown__list">
            <h4 className="nav__head">
              Account
              <BsChevronDown fill="#827f7f" size={10} />
            </h4>
            <li className="dropdown__link">
              <Link href="/talent/profile" className="link" onClick={closeMenu}>
                Profile
              </Link>
            </li>
            <li className="dropdown__link">
              <Link href="/talent/settings" className="link" onClick={closeMenu}>
                Settings
              </Link>
            </li>
            <li className="dropdown__link">
              <Link href="/talent/testimonials" className="link" onClick={closeMenu}>
                Testimonials
              </Link>
            </li>
          </ul>
          <ul className="nav__list">
            <li className="nav__item pd_btm">
              <Link
                href="/blog"
                onClick={() => handleMenuClick("blog")}
                className={`nav__link ${active === "blog" ? "active__link" : ""}`}
              >
                Blog
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/signout" className="nav__button">
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
