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
      <div className={styles.featured__content}>
        <div className={styles.featured__posts}>
        {posts.map((post, index) => (
          <Link href={`/blog/${encodeURIComponent(post.title)}`} key={post.id}>
            <div className={`${styles.post} ${index === 0 ? styles.featured : ""}`}>
              {post.urlToImage && (
                <img
                  src={post.urlToImage}
                  className={styles.post__image}
                  alt="Post"
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
