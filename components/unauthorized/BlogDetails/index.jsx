// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { Posts } from "../BlogList";
// import styles from "./style.module.scss";

// const BlogDetails = () => {
//   const router = useRouter();
//   // const { postId } = router.query;

//   // Find the corresponding blog post based on the postId
//   // const post = postId ? Posts.find((post) => post.title === postId) : null;

//   // if (!post || !postId) {
//   //   return (
//   //     <div className="blogDetails__page">
//   //       <div className="blogDetails__content">
//   //         <p className="blogDetails__notFound">Post not found.</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // const {
//   //   title,
//   //   excerpt,
//   //   author,
//   //   minutes,
//   //   author_image,
//   //   post_coverImage,
//   //   date_posted,
//   //   category,
//   // } = post;

//   return (
//     <div className={styles.blogDetails__page}>
//       <div className={styles.blogDetails__content}>
//         <img
//           src="https://source.unsplash.com/random/800x600?lifestyle"
//           alt="blog"
//           className={styles.blogDetails__image}
//         />
//         <div className={styles.blogDetails__image__overlay}></div>
//         {/* <div className={styles.blogDetails__image__text}>
//           <span className={styles.blogDetails__image__category}>Lifestyle</span>
//           <span className={styles.blogDetails__image__date}>22 May, 2022</span>
//         </div> */}
        
//         <div className={styles.blogDetails__image__title}>
//           <h1 className={styles.blogDetails__image__title__text}>
//             The art of minimal living
//           </h1>
//         </div>
//         <div className={styles.blogDetails__meta}>
//           <span className={styles.blogDetails__category}>Category: Lifestyle</span>
//           <span className={styles.blogDetails__date}>Date Posted: 22 May, 2022</span>
//           <span className={styles.blogDetails__author}>By John Doe</span>
//         </div>
//         {/* <div className={styles.blogDetails__image__author}>
//           <img
//             src="https://source.unsplash.com/random/800x600?person"
//             alt="author"
//             className={styles.blogDetails__image__author__image}
//           />
//           <span className={styles.blogDetails__image__author__name}>
//             John Doe</span>
//         </div> */}
//         <div className={styles.blogDetails__details}>
//             <p className={styles.blogDetails__text}>
//             Making a decision to do something – this is the first step. We all
//             know that nothing moves until someone makes a decision. The first
//             action is always in making the decision to proceed. This is a
//             fundamental step, which most people overlook.
//             </p>
//             <p className={styles.blogDetails__text}>
//             Without clarity, you send a very garbled message out to the Universe.
//             We know that the Law of Attraction says that we will attract what we
//             focus on, so if we don’t have clarity, we will attract confusion.
//             </p>
//             <blockquote className={styles.blogDetails__quote}>
//             “The sad thing is the majority of people have no clue about what they
//             truly want. They have no clarity. When asked the question, responses
//             will be superficial at best, and at worst.” – Alice Williams
//             </blockquote>

//         </div>
//         <div className={styles.blogDetails__tags}>
//           <span className={styles.blogDetails__tag}>Career Advice</span>
//           <span className={styles.blogDetails__tag}>Recruitment</span>
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;

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
