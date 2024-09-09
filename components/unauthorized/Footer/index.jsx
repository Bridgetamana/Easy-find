import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.unauthorized__footer}>
      <div className={styles.footer__bottom}>
         <div className={styles.footer__right}>
              <Image
                src="/assets/images/EasyFind.svg"
                alt="Logo"
                sizes="100px"
                width={100}
                height={10}
                className={styles.logo}
              />
           {/* <ul className={styles.footer__list}>
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
         <p className={styles.footer__text}>&copy; {new Date().getFullYear()} EasyFind. All rights reserved</p>
         </div>
       </div>
    </footer>
  );
}
