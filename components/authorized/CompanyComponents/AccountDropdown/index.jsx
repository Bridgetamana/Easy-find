import React from "react";
import Link from "next/link";
import "./style.scss";

export default function CompanyDropdown({ closeMenu }) {
  return (
    <div className="account__menu">
      <ul className="dropdown__list">
        <li className="dropdown__link">
          <Link href="/company/profile" className="link" onClick={closeMenu}>
            Profile
          </Link>
        </li>
        <li className="dropdown__link">
          <Link href="/company/dashboard" className="link" onClick={closeMenu}>
            Dashboard
          </Link>
        </li>
        <li className="dropdown__link">
          <Link href="/company/settings" className="link" onClick={closeMenu}>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
