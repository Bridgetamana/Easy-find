import React from "react";
import Link from "next/link";
import style from "./style.module.scss";

export default function CompanyDropdown({ closeMenu }) {
  return (
    <div className={style.account__menu}>
      <ul className={style.dropdown__list}>
        <li className={style.dropdown__link}>
          <Link href="/company/profile" className={style.link} onClick={closeMenu}>
            Profile
          </Link>
        </li>
        <li className={style.dropdown__link}>
          <Link href="/company/dashboard" className={style.link} onClick={closeMenu}>
            Dashboard
          </Link>
        </li>
        <li className={style.dropdown__link}>
          <Link href="/company/settings" className={style.link} onClick={closeMenu}>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
