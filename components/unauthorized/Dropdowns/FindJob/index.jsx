import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./style.module.scss";

const sections = [
  { id: 'testimonials' },
];


export default function FindJob() {
  const findJobRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    function updateActiveIndex() {
      if (!findJobRef.current) {
        return;
      }

      let newActiveIndex = null;
      let elements = sections
        .map(({ id }) => document.getElementById(id))
        .filter((el) => el !== null);
      let bodyRect = document.body.getBoundingClientRect();
      let offset = bodyRect.top + findJobRef.current.offsetHeight + 1;

      if (window.scrollY >= Math.floor(bodyRect.height) - window.innerHeight) {
        setActiveIndex(sections.length - 1);
        return;
      }

      for (let index = 0; index < elements.length; index++) {
        if (
          window.scrollY >=
          elements[index].getBoundingClientRect().top - offset
        ) {
          newActiveIndex = index;
        } else {
          break;
        }
      }

      setActiveIndex(newActiveIndex);
    }

    updateActiveIndex();

    window.addEventListener("resize", updateActiveIndex);
    window.addEventListener("scroll", updateActiveIndex, { passive: true });

    return () => {
      window.removeEventListener("resize", updateActiveIndex);
      window.removeEventListener("scroll", updateActiveIndex);
    };
  }, []);
  
  return (
    <div className={styles.findJob__menu} ref={findJobRef}>
      <ul className={styles.dropdown__list}>
        <li className={styles.dropdown__link}>
          <Link href="/browse-jobs" className={styles.link}>
            Browse Jobs
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/become-talent" className={styles.link}>
            Find Companies
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/terms" className={styles.link}>
            Terms
          </Link>
        </li>
      </ul>
    </div>
  );
}
