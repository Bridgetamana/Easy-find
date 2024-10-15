import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./style.module.scss";

export default function AboutBlog() {
  return (
    <div className={` ${styles.aboutBlog__section} flex flex-col gap-5 mx-auto my-20 max-w-8xl px-4 sm:px-12 sm:mt-24 lg:mt-24 justify-center items-center`}>
      <p className={`${styles.description} text-lg lg:text-2xl font-medium leading-[50px] text-center`}>
        EasyFind has a blog feature where users can read articles and benefit from
        insightful content. Stay informed, learn new tips, and enhance your skills 
        by exploring our latest articles.
      </p>
      <div className={styles.buttonContainer}>
        <Link href="/blog" className={styles.action__button}>
          Read Now
        </Link>
      </div>
    </div>
  )
}
