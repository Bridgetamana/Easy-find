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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import LoadingScreen from "../../utils/Loaders/Loader";
import styles from "./style.module.scss";

export default function BlogList() {
  const router = useRouter();
  const { query } = router;
  const { category } = query; 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        const apiUrl = category 
          ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(category)}&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`
          : `https://newsapi.org/v2/everything?q="job application" OR "getting a job" OR "latest job" OR "resume tips"&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`;
        
        const response = await axios.get(apiUrl);
        setPosts(response.data.articles); 
        setLoading(false);
      } catch (error) {
        setError("Failed to load blog posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <section className={styles.featured__component}>
      {!category && (
      <div className="flex flex-col-reverse items-center justify-center lg:flex-row gap-4 mb-7 pb-7">
        <div className="flex flex-col justify-center">
          <h2 className="text-black font-semibold text-4xl py-2">Why Our Blog is Your Essential Resource for Job Seekers and Employers</h2>
          <p className="text-sm py-2 leading-6">In the competitive world of job hunting and talent acquisition, staying informed is key. Our blog is designed to provide you with practical advice, industry insights, and tips for both job seekers and employers. Whether you’re looking for ways to stand out in a crowded job market or seeking top talent to grow your team, our articles are crafted to give you the edge. From resume tips and interview strategies to recruitment trends, our blog helps bridge the gap between finding the right job and hiring the perfect candidate.</p>
        </div>
        <Image
          src="/assets/images/blogImage.png"
          alt="blog-image"
          width={600}
          height={300}
          className="rounded-md"
          priority
        />
      </div>
      )}
      <div className={styles.featured__content}>
        <div className={styles.featured__posts}>
        {posts.map((post, index) => (
          <Link href={`/blog/${encodeURIComponent(post.title)}`} key={`${post.title}-${index}`}>
            <div className={`${styles.post} ${index === 0 ? styles.featured : ""}`}>
            {post.urlToImage ? (
              <img
                src={post.urlToImage}
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
                {/* <p className={styles.post__text}>{post.description}</p> */}
                <div className={styles.post__wrap}>
                  {post.author && (
                    <div className={styles.post__author}>
                      <p className={styles.post__author_name}>{post.author}</p>
                    </div>
                  )}
                  <p className={styles.post__date}>
                    {new Date(post.publishedAt).toDateString()}
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
}
