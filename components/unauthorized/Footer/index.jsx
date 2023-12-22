import React from "react";
import "./style.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="unauthorized__footer">
      <div className="footer__top">
        <div className="footer__top_component">
          <h3 className="title">For Talents</h3>
          <ul className="footer__list">
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Browse Jobs
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Browse Companies
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Salary Estimator
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                  Submit Resume
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
              Job Alerts
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="footer__top_component">
          <h3 className="title">For Employers</h3>
          <ul className="footer__list">
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
              Browse Candidates
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
              Browse Categories
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
              Employer Dashboard
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Post Job
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Job Packages
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__top_component">
          <h3 className="title">Legal</h3>
          <ul className="footer__list">
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Terms of Service
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Privacy Policy
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__top_component">
          <h3 className="title">Connect</h3>
          <ul className="footer__list">
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Facebook
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                Twitter
              </Link>
            </li>
            <li className="footer__list_item">
              <Link href="/" className="footer__link">
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
         <div className="footer__right">
           <div className="logo">
             <h2 className="logo__name">MinuJobs</h2>
           </div>
           <ul className="footer__list">
             <li className="footer__list_item">
               <a className="footer__link" href="/">
                 About
               </a>
             </li>
             <li className="footer__list_item">
               <a className="footer__link" href="/">
                 Terms
               </a>
             </li>
             <li className="footer__list_item">
               <a className="footer__link" href="/">
                 Privacy
               </a>
             </li>
             <li className="footer__list_item">
               <a className="footer__link" href="/">
                 Contact
               </a>
             </li>
           </ul>
         </div>
         <p className="footer__text">&copy; {new Date().getFullYear()} MinuJobs. All rights reserved</p>
       </div>
    </footer>
  );
}
