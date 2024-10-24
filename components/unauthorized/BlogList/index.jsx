// "use client"
// import React, { useEffect, useState } from "react";
// import { MdVerified } from "react-icons/md";
// import { BsDot } from "react-icons/bs";
// import { GoUnverified } from "react-icons/go";
// import axios from "axios";
// import Link from "next/link"
// import styles from "./style.module.scss"

// export default function FeaturedPosts() {
//   const [postData, setPostData] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://api.mediastack.com/v1/news?access_key=5cb6d7c0f7ce03f04328fca8d7456123&categories=technology");
//         setPostData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching blog posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const popularPost = postData.length > 0 ? postData[0] : null;

//   return (
//     <section className={styles.featured__component}>
//       <div className={styles.featured__content}>
        

//         <div className={styles.featured__posts}>
//         {postData.slice(1).map((post) => (
//               <Link href={`/blog/details/`} key={post.id}>
//                 <div className={styles.post}>
//                 {/* <img
//                   src={post.attributes.post_coverImage}
//                   className={styles.post__image}
//                   alt="Post"
//                 /> */}
//                 <div className={styles.post__body}>
//                   <h2 className={styles.post__title}>{post.attributes.Text}</h2>
//                   <p className={styles.post__text}>{post.attributes.Content}</p>
//                   <div className={styles.post__wrap}>
//                     <img
//                       src={post.attributes.author_image}
//                       className={styles.post__author_image}
//                       alt="Author"
//                     />
//                     <div className={styles.post__info}>
//                       <div className={styles.post__author}>
//                         {/* Author name */}
//                         <p className={styles.post__author_name}>
//                           {post.attributes.author}
//                         </p>
//                         {/* Verified icon */}
//                         {post.attributes.verified === true ? (
//                           <MdVerified className={styles.post__verified_icon} fill="#05a512" />
//                         ) : (
//                           <GoUnverified className={styles.post__verified_icon} fill="#f5a623" />
//                         )}
//                         <BsDot />
//                         {/* Category */}
//                         <p className={styles.post__category}>
//                           {post.attributes.category}
//                         </p>
//                       </div>
//                       <div className={styles.post__details}>
//                         {/* Read time */}
//                         <p className={styles.post__minutes}>{post.attributes.minutes} min read</p>
//                         <BsDot />
//                         {/* Published date */}
//                         <p className={styles.post__date}>
//                           {new Date(post.attributes.publishedAt).toDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig/firebase'; 
import { useRouter } from 'next/router'; 
import Link from "next/link";
import Image from "next/image";
import LoadingScreen from "../../utils/Loaders/Loader";
import customLoader from '../../utils/Loaders/imageLoader';
import styles from "./style.module.scss";

const BlogList = () => {
  const [featuredBlog, setFeaturedBlog] = useState(null); 
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const { category } = router.query; 
  const postsRef = useRef([]);

  useEffect(() => {
    const fetchFeaturedBlog = async () => {
      try {
        const blogCollection = collection(db, 'blogCollection');
        const featuredQuery = query(blogCollection, where('isFeatured', '==', true));
        const featuredSnapshot = await getDocs(featuredQuery);
        
        if (!featuredSnapshot.empty) {
          const featuredPost = featuredSnapshot.docs[0].data();
          setFeaturedBlog({ id: featuredSnapshot.docs[0].id, ...featuredPost });
        }
      } catch (err) {
        console.error('Error fetching featured blog:', err);
        setError('Failed to load featured blog');
      }
    };

    fetchFeaturedBlog();
  }, []);

  // Fetch Other Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const blogCollection = collection(db, 'blogCollection');
        let blogQuery;
  
        if (!category || category === 'all') {
          blogQuery = query(blogCollection, where('isFeatured', '==', false));
        } else {
          blogQuery = query(blogCollection, where('category', '==', category), where('isFeatured', '==', false));
        }
  
        const blogSnapshot = await getDocs(blogQuery);
        const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        setBlogs(blogList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts');
        setLoading(false);
      }
    };
  
    fetchBlogs();
  }, [category]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    postsRef.current.forEach((post) => {
      if (post) {
        observer.observe(post);
      }
    });
    
    return () => {
      postsRef.current.forEach((post) => {
        if (post) {
          observer.unobserve(post);
        }
      });
    };
  }, [blogs]);

  if (loading) {
    return <div><LoadingScreen /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <section className={styles.featured__component}>
       {!category && featuredBlog && (
        <div className="relative mb-5 pb-5">
          <div className="relative w-full h-[550px]">
            <Image
              loader={customLoader}
              src={featuredBlog.image || '/assets/images/blogImage.png'} // Dynamic image from Firebase
              alt={featuredBlog.title}
              fill
              className="object-cover rounded-2xl"
              priority
            />
            <div className="absolute inset-0 flex flex-col-reverse md:flex-row items-end justify-between text-zinc-900 lg:text-white">
              <div className="p-8 basis-10/12">
                <p className="font-bold py-1">Featured</p>
                <h2 className="text-2xl lg:text-4xl font-bold py-2 animate-swoop-in">
                  {featuredBlog.title}
                </h2>
                <p className="text-sm py-2 leading-6 animate-swoop-in delay-300 font-semibold">
                  {featuredBlog.summary}...
                </p>
              </div>
              <Link href={`/blog/${featuredBlog.id}`} className='flex items-center justify-center basis-2/12 group px-4 pb-10 bg-transparent h-full text-white hover:text-black hover:bg-opacity-70 hover:bg-stone-500'>
                  <i className="bx bx-lg bx-fade-right-hover mt-8 pt-8 bx-right-arrow-alt group-hover:text-black transition-transform transform group-hover:translate-x-2"></i>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <nav className={styles.category__nav}>
        <Link href="/blog" className={`${styles.category__Link} sm:text-sm`}>All</Link>
        <Link href="/blog?category=job-application" className={`${styles.category__Link} sm:text-sm`}>Job Application</Link>
        <Link href="/blog?category=resume-tips" className={`${styles.category__Link} sm:text-sm`}>Resume Tips</Link>
        <Link href="/blog?category=getting-a-job" className={`${styles.category__Link} sm:text-sm`}>Getting a Job</Link>
      </nav>

       <div className={styles.featured__content}>
         <div className={styles.featured__posts}>
           {blogs.map((post, index) => (
             <Link href={`/blog/${encodeURIComponent(post.id)}`} key={`${post.id}-${index}`}>
               <div
                 ref={(el) => (postsRef.current[index] = el)}
                 className={`${styles.post} ${styles['swoop-in']} ${index === 0 ? styles.featured : ""}`}
               >
                 {post.image ? (
                   <img
                     src={post.image}
                     className={styles.post__image}
                     alt="Post"
                     onError={(e) => {
                       e.target.src = "/assets/images/blogImage.png";
                     }}
                   />
                 ) : (
                   <img
                     src="/assets/images/blogImage.png"
                     className={styles.post__image}
                     alt="Default Post"
                   />
                 )}
                 <div className={styles.post__body}>
                   <h2 className={styles.post__title}>{post.title}</h2>
                   <p className={styles.post__summary}>{post.summary.slice(0, 70)}...</p>
                   <div className={styles.post__wrap}>
                     {post.author && (
                       <div className={styles.post__author}>
                         <p className={styles.post__author_name}>{post.author}</p>
                       </div>
                     )}
                     <p className={styles.post__date}>
                      {new Date(post.datePublished.seconds * 1000).toDateString()}
                     </p>
                   </div>
                 </div>
               </div>
             </Link>
           ))}
         </div>
       </div>
     </section>
  );
};

export default BlogList;
