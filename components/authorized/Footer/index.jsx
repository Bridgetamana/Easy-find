import React from "react";
import "./style.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="authorized__footer">
      <div className="footer__bottom">
         <div className="footer__right">
             <h2 className="logo__name">MinuJobs</h2>
         </div>
         <p className="footer__left">&copy; {new Date().getFullYear()} MinuJobs. All rights reserved</p>
       </div>
    </footer>
  );
}
