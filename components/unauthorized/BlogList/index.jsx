"use client"
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { GoUnverified } from "react-icons/go";
import axios from "axios";
import Link from "next/link"
import styles from "./style.module.scss"

export default function FeaturedPosts() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/articles");
        setPostData(response.data.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const popularPost = postData.length > 0 ? postData[0] : null;

  return (
    <section className={styles.featured__component}>
      <div className={styles.featured__content}>
        

        <div className={styles.featured__posts}>
        {postData.slice(1).map((post) => (
              <Link href={`/blog/details/`} key={post.id}>
                <div className={styles.post}>
                <img
                  src={post.attributes.post_coverImage}
                  className={styles.post__image}
                  alt="Post"
                />
                <div className={styles.post__body}>
                  <h2 className={styles.post__title}>{post.attributes.Text}</h2>
                  <p className={styles.post__text}>{post.attributes.Content}</p>
                  <div className={styles.post__wrap}>
                    <img
                      src={post.attributes.author_image}
                      className={styles.post__author_image}
                      alt="Author"
                    />
                    <div className={styles.post__info}>
                      <div className={styles.post__author}>
                        {/* Author name */}
                        <p className={styles.post__author_name}>
                          {post.attributes.author}
                        </p>
                        {/* Verified icon */}
                        {post.attributes.verified === true ? (
                          <MdVerified className={styles.post__verified_icon} fill="#05a512" />
                        ) : (
                          <GoUnverified className={styles.post__verified_icon} fill="#f5a623" />
                        )}
                        <BsDot />
                        {/* Category */}
                        <p className={styles.post__category}>
                          {post.attributes.category}
                        </p>
                      </div>
                      <div className={styles.post__details}>
                        {/* Read time */}
                        <p className={styles.post__minutes}>{post.attributes.minutes} min read</p>
                        <BsDot />
                        {/* Published date */}
                        <p className={styles.post__date}>
                          {new Date(post.attributes.publishedAt).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
