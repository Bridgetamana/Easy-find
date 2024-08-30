"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Posts } from "../BlogList";
import styles from "./style.module.scss";

const BlogDetails = () => {
  const router = useRouter();
  // const { postId } = router.query;

  // Find the corresponding blog post based on the postId
  // const post = postId ? Posts.find((post) => post.title === postId) : null;

  // if (!post || !postId) {
  //   return (
  //     <div className="blogDetails__page">
  //       <div className="blogDetails__content">
  //         <p className="blogDetails__notFound">Post not found.</p>
  //       </div>
  //     </div>
  //   );
  // }

  // const {
  //   title,
  //   excerpt,
  //   author,
  //   minutes,
  //   author_image,
  //   post_coverImage,
  //   date_posted,
  //   category,
  // } = post;

  return (
    <div className={styles.blogDetails__page}>
      <div className={styles.blogDetails__content}>
        <img
          src="https://source.unsplash.com/random/800x600?lifestyle"
          alt="blog"
          className={styles.blogDetails__image}
        />
        <div className={styles.blogDetails__image__overlay}></div>
        {/* <div className={styles.blogDetails__image__text}>
          <span className={styles.blogDetails__image__category}>Lifestyle</span>
          <span className={styles.blogDetails__image__date}>22 May, 2022</span>
        </div> */}
        
        <div className={styles.blogDetails__image__title}>
          <h1 className={styles.blogDetails__image__title__text}>
            The art of minimal living
          </h1>
        </div>
        <div className={styles.blogDetails__meta}>
          <span className={styles.blogDetails__category}>Category: Lifestyle</span>
          <span className={styles.blogDetails__date}>Date Posted: 22 May, 2022</span>
          <span className={styles.blogDetails__author}>By John Doe</span>
        </div>
        {/* <div className={styles.blogDetails__image__author}>
          <img
            src="https://source.unsplash.com/random/800x600?person"
            alt="author"
            className={styles.blogDetails__image__author__image}
          />
          <span className={styles.blogDetails__image__author__name}>
            John Doe</span>
        </div> */}
        <div className={styles.blogDetails__details}>
            <p className={styles.blogDetails__text}>
            Making a decision to do something – this is the first step. We all
            know that nothing moves until someone makes a decision. The first
            action is always in making the decision to proceed. This is a
            fundamental step, which most people overlook.
            </p>
            <p className={styles.blogDetails__text}>
            Without clarity, you send a very garbled message out to the Universe.
            We know that the Law of Attraction says that we will attract what we
            focus on, so if we don’t have clarity, we will attract confusion.
            </p>
            <blockquote className={styles.blogDetails__quote}>
            “The sad thing is the majority of people have no clue about what they
            truly want. They have no clarity. When asked the question, responses
            will be superficial at best, and at worst.” – Alice Williams
            </blockquote>

        </div>
        <div className={styles.blogDetails__tags}>
          <span className={styles.blogDetails__tag}>Career Advice</span>
          <span className={styles.blogDetails__tag}>Recruitment</span>
        </div>
       
      </div>
    </div>
  );
};

export default BlogDetails;
