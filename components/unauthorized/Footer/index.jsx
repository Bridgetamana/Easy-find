import React from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="unauthorized__footer">
      <div className="footer__bottom">
         <div className="footer__right">
              <Image
                src="/assets/images/EasyFind.svg"
                alt="Logo"
                sizes="100px"
                width={100}
                height={10}
                layout="fixed"
                className="logo"
              />
           {/* <ul className="footer__list">
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
           </ul> */}
         <p className="footer__text">&copy; {new Date().getFullYear()} EasyFind. All rights reserved</p>
         </div>
       </div>
    </footer>
  );
}
