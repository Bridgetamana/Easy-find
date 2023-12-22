import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import Link from "next/link";
import "./style.scss";
import HireTalent from "../Dropdowns/HireTalent/";
import FindJob from "../Dropdowns/FindJob";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Button from "@/components/utils/Button";

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
    <header className="unauthorized__header">
      {/* Desktop Header */}
      <div className="desktop__header">
        <div className="header__logo">
          <h2 className="logo__name">EasyFind</h2>
        </div>
        <nav className="nav__bar">
          <ul className="nav__list">
            <li
              className={jobDropdown ? "active__menu" : "nav__menu"}
              onClick={toggleJobDropdown}
            >
              Find job
              <BsChevronDown fill="#827f7f" size={10} />
              <div className={`${jobDropdown ? "findJob_modal" : "no__show"}`}>
                <FindJob />
              </div>
            </li>
            <li
              className={hireDropdown ? "active__menu" : "nav__menu"}
              onClick={toggleHireDropdown}
            >
              Hire talent
              <BsChevronDown fill="#827f7f" size={10} />
              <div
                className={`${hireDropdown ? "hireTalent__modal" : "no__show"}`}
              >
                <HireTalent />
              </div>
            </li>
            <li className="nav__item">
              <Link href="/blog" className="nav__link">
                Blog
              </Link>
            </li>
            <RxDividerVertical size={24} />
            <li className="nav__item">
              <Link href="/login" className="nav__link">
                Sign In
              </Link>
            </li>
            <li className="nav__item">
              {/* <Link href="/signup" className="nav__button">
                Get Started
              </Link> */}
            </li>
            <Button
              type="button"
              title="Get Started"
              variant="nav__button"
              icon={<HiOutlineArrowNarrowRight className="search__icon" />}
              onClick={() => {
                console.log("Clicked");
              }}
            />
          </ul>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="mobile__header">
        <div className="header__logo">
          <h2 className="logo__name">EasyFind</h2>
        </div>
        <button type="button" className="menu__button" onClick={toggleMenu}>
          <FiMenu size={32} stroke="#2563eb" fill="#2563eb" />
        </button>

        <nav className={`nav__bar ${showMenu ? "show__navbar" : "nav__bar"}`}>
          <div className="nav__header">
            <h2 className="logo__name">EasyFind</h2>
            <button type="button" className="close__menu" onClick={closeMenu}>
              <CgClose size={24} />
            </button>
          </div>

          {/* Navigation List */}
          <ul className="dropdown__list">
            <h4 className="nav__head">
              Find job
              <BsChevronDown fill="#827f7f" size={10} />
            </h4>
            <li className="dropdown__link">
              <Link href="/minu" className="link">
                How Minu works
              </Link>
            </li>
            <li className="dropdown__link">
              <Link href="/testimonials" className="link">
                Testimonials
              </Link>
            </li>
            <li className="dropdown__link">
              <Link href="/become-talent" className="link">
                Become a Talent
              </Link>
            </li>
            <li className="dropdown__link">
              <Link href="/terms" className="link">
                Terms
              </Link>
            </li>
          </ul>

          <ul className="dropdown__list">
            <h4 className="nav__head">
              Hire talent
              <BsChevronDown fill="#827f7f" size={10} />
            </h4>
            <li className="dropdown__link">
              <Link href="/settings" className="link">
                Post Jobs
              </Link>
            </li>
            <li className="dropdown__link">
              <Link href="/support" className="link">
                Testimonials
              </Link>
            </li>
            <li className="dropdown__link">
              <Link href="/become-member" className="link">
                Partnership
              </Link>
            </li>
            <li className="dropdown__link">
              <Link href="/terms" className="link">
                Terms
              </Link>
            </li>
          </ul>

          <ul className="nav__list">
            <li className="nav__item">
              <Link href="/blog" className="nav__link">
                Blog
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/login" className="nav__link">
                Sign In
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/signup" className="nav__button">
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
