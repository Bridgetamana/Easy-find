import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./style.module.scss";

const sections = [
  { id: 'testimonials' },
];

export default function HireTalent() {
  const [showMenu, setShowMenu] = useState(false);

  const isActive = () => {
    setShowMenu(!showMenu);
  };
  const hireTalentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    function updateActiveIndex() {
      if (!hireTalentRef.current) {
        return;
      }

      let newActiveIndex = null;
      let elements = sections
        .map(({ id }) => document.getElementById(id))
        .filter((el) => el !== null);
      let bodyRect = document.body.getBoundingClientRect();
      let offset = bodyRect.top + hireTalentRef.current.offsetHeight + 1;

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
    <div className={styles.hireTalent__menu} ref={hireTalentRef}>
      <ul className={styles.dropdown__list}>
        <li className={styles.dropdown__link}>
          <Link href="/company/dashboard/post-job" className={styles.link}>
            Post Jobs
          </Link>
        </li>
        <li className={styles.dropdown__link}>
          <Link href="/browse-talents" className={styles.link}>
            Find Talents
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
