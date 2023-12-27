import React from "react";
import Image from 'next/image'
import "./style.scss";

export default function Footer() {
  return (
    <footer className="authorized__footer">
      <div className="footer__bottom">
        <div className="footer__right">
        <Image
        src="/assets/images/EasyFind.svg"
        alt="Logo"
        width={100}
        height={100}
        layout="fixed"
        className="logo"
      />
      </div>
        <p className="footer__left">
          &copy; {new Date().getFullYear()} EasyFind. All rights reserved
        </p>
      </div>
    </footer>
  );
}
