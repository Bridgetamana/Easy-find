"use client";
import { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import LoadingScreen from "../../utils/Loaders/Loader";
import customLoader from "../../utils/Loaders/imageLoader";
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
        const blogCollection = collection(db, "blogCollection");
        const featuredQuery = query(
          blogCollection,
          where("isFeatured", "==", true)
        );
        const featuredSnapshot = await getDocs(featuredQuery);

        if (!featuredSnapshot.empty) {
          const featuredPost = featuredSnapshot.docs[0].data();
          setFeaturedBlog({ id: featuredSnapshot.docs[0].id, ...featuredPost });
        }
      } catch (err) {
        console.error("Error fetching featured blog:", err);
        setError("Failed to load featured blog");
      }
    };

    fetchFeaturedBlog();
  }, []);

  // Fetch Other Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const blogCollection = collection(db, "blogCollection");
        let blogQuery;

        if (!category || category === "all") {
          blogQuery = query(blogCollection, where("isFeatured", "==", false));
        } else {
          blogQuery = query(
            blogCollection,
            where("category", "==", category),
            where("isFeatured", "==", false)
          );
        }

        const blogSnapshot = await getDocs(blogQuery);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(blogList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blog posts");
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
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {error ? (
        <LoadingScreen />
      ) : (
        <section className={styles.featured__component}>
          {!category && featuredBlog && (
            <div className="relative mb-12">
              <div className="relative w-full h-[550px] group overflow-hidden rounded-2xl">
                <Image
                  loader={customLoader}
                  src={featuredBlog.image || "/assets/images/blogImage.png"}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-500 rounded-full mb-4">
                      Featured
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 transform translate-y-0 transition-all duration-300 ease-out">
                      {featuredBlog.title}
                    </h2>
                    <p className="hidden md:block text-lg mb-6 text-gray-200 max-w-3xl">
                      {featuredBlog.summary}...
                    </p>
                    <Link
                      href={`/blog/${featuredBlog.id}`}
                      className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-300"
                    >
                      <span className="mr-2">Read More</span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <nav className={styles.category__nav}>
            <Link href="/blog" className={`${styles.category__Link} border-b-2 border-blue-500`}>
              All
            </Link>
            <Link
              href="/blog?category=job-application"
              className={`${styles.category__Link}`}
            >
              Job Application
            </Link>
            <Link
              href="/blog?category=resume-tips"
              className={`${styles.category__Link}`}
            >
              Resume Tips
            </Link>
            <Link
              href="/blog?category=getting-a-job"
              className={`${styles.category__Link}`}
            >
              Getting a Job
            </Link>
          </nav>

          <div className={styles.featured__content}>
            <div className={styles.featured__posts}>
              {blogs.map((post, index) => (
                <Link
                  href={`/blog/${encodeURIComponent(post.id)}`}
                  key={`${post.id}-${index}`}
                  className="group"
                >
                  <div
                    ref={(el) => (postsRef.current[index] = el)}
                    className={`${styles.post} ${styles["swoop-in"]}`}
                  >
                    <div className="relative h-64 overflow-hidden rounded-xl">
                      <Image
                        loader={customLoader}
                        src={post.image || "/assets/images/blogImage.png"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/assets/images/blogImage.png";
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.summary}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        {post.author && (
                          <span className="font-medium text-gray-900">
                            {post.author}
                          </span>
                        )}
                        <time className="text-gray-500">
                          {new Date(
                            post.datePublished.seconds * 1000
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogList;
