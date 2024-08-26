import React from "react";
import Link from "next/link";
import "./style.module.scss";

export default function FindJob() {
 
  return (
    <div className="findJob__menu">
      <ul className="dropdown__list">
        <li className="dropdown__link">
          <Link href="/minu" className="link">
            Browse Jobs
          </Link>
        </li>
        <li className="dropdown__link">
          <Link href="/become-talent" className="link">
            Find Companies
          </Link>
        </li>
        <li className="dropdown__link">
          <Link href="/testimonials" className="link">
            Testimonials
          </Link>
        </li>
        <li className="dropdown__link">
          <Link href="/terms" className="link">
            Terms
          </Link>
        </li>
      </ul>
    </div>
  );
}
