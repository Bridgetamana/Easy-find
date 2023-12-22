import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { GoUnverified } from "react-icons/go";
import axios from "axios";
import Link from "next/link";

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
    <section className="featured__component">
      <div className="featured__content">
        

        <div className="featured__posts">
        {postData.slice(1).map((post) => (
              <Link href={`/blog/details/`} key={post.id}>
                <div className="post">
                <img
                  src={post.attributes.post_coverImage}
                  className="post__image"
                  alt="Post"
                />
                <div className="post__body">
                  <h2 className="post__title">{post.attributes.Text}</h2>
                  <p className="post__text">{post.attributes.Content}</p>
                  <div className="post__wrap">
                    <img
                      src={post.attributes.author_image}
                      className="post__author_image"
                      alt="Author"
                    />
                    <div className="post__info">
                      <div className="post__author">
                        {/* Author name */}
                        <p className="post__author_name">
                          {post.attributes.author}
                        </p>
                        {/* Verified icon */}
                        {post.attributes.verified === true ? (
                          <MdVerified className="post__verified_icon" fill="#05a512" />
                        ) : (
                          <GoUnverified className="post__verified_icon" fill="#f5a623" />
                        )}
                        <BsDot />
                        {/* Category */}
                        <p className="post__category">
                          {post.attributes.category}
                        </p>
                      </div>
                      <div className="post__details">
                        {/* Read time */}
                        <p className="post__minutes">{post.attributes.minutes} min read</p>
                        <BsDot />
                        {/* Published date */}
                        <p className="post__date">
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
