"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig/firebase'; 
import BlogLayout from '../../../pages/blog/layout';
import LoadingScreen from '../../utils/Loaders/Loader';
import styles from "./style.module.scss";

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBlogDetails = async () => {
        try {
          const docRef = doc(db, 'blogCollection', id); 
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setBlogData(docSnap.data());
          } else {
            setError("No blog found with this ID.");
          }
        } catch (error) {
          console.error("Error fetching blog details:", error.message);
          setError("Failed to load blog details.");
        } finally {
          setLoading(false);
        }
      };

      fetchBlogDetails();
    }
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!blogData) {
    return <p>No blog data found.</p>;
  }

  return (
    <BlogLayout>
      <button onClick={() => window.history.back()} className='w-fit flex flex-row text-[#2563eb] items-center py-[1rem] px-[1rem] lg:px-[4rem] gap-1'>
        <i className='bx bx-arrow-back bx-sm' ></i>
        <p className='py-2 block font-medium transition-all duration-300 ease-in-out transform hover:scale-105 items-center'>Back</p>
      </button>
      <div className={styles.blogDetails__page}>
        <div className={styles.blogDetails__content}>
          <img
            src={blogData.image || "https://source.unsplash.com/random/800x600?lifestyle"}
            alt="blog"
            className={styles.blogDetails__image}
          />
          <div className={styles.blogDetails__image__title}>
            <h1 className={styles.blogDetails__image__title__text}>
              {blogData.title || "Default Title"}
            </h1>
          </div>
          <div className={styles.blogDetails__meta}>
            <span className={styles.blogDetails__category}>
             {blogData.category || "General"}
            </span>
            <span className={styles.blogDetails__date}>
              Date Posted: {new Date(blogData.datePublished.seconds * 1000).toDateString() || "Unknown Date"}
            </span>
            <span className={styles.blogDetails__author}>
              By {blogData.author || "Unknown Author"}
            </span>
          </div>
          <div className={styles.blogDetails__details}>
            <p className={styles.blogDetails__text}>
              {blogData.content || "No content available."}
            </p>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogDetails;
