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

  const isTalentPath = router.pathname.startsWith('/talent');
  const isCompanyPath = router.pathname.startsWith('/company');
  const basePath = isTalentPath ? '/talent' : isCompanyPath ? '/company' : '';

  useEffect(() => {
    const fetchFeaturedBlog = async () => {
      try {
        const blogCollection = collection(db, "blogCollection");
        const featuredQuery = query(
          blogCollection,
          where("isFeatured", "==", true)
        );
        const featuredSnapshot = await getDocs(featuredQuery);

        if (featuredSnapshot.empty) {
          setError("No featured blogs found.");
          setLoading(false);
          return;
        }

        const featuredPost = featuredSnapshot.docs[0].data();
        setFeaturedBlog({ id: featuredSnapshot.docs[0].id, ...featuredPost });
      } catch (err) {
        console.error("Error fetching featured blog:", err);
        setError("Failed to load featured blog.");
      }
    };

    fetchFeaturedBlog();
  }, []);

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
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  return (
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {featuredBlog.title}
                </h2>
                <p className="hidden md:block text-lg mb-6 text-gray-200 max-w-3xl">
                  {featuredBlog.summary}...
                </p>
                <Link
                  href={`${basePath}/blog/${featuredBlog.id}`}
                  className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-300 group"
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
        <Link
          href={`${basePath}/blog`}
          className={`${styles.category__Link} ${
            !category ? "border-b-2 border-blue-500" : ""
          }`}
        >
          All
        </Link>
        <Link
          href={`${basePath}/blog?category=job-application`}
          className={`${styles.category__Link} ${
            category === "job-application" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Job Application
        </Link>
        <Link
          href={`${basePath}/blog?category=resume-tips`}
          className={`${styles.category__Link} ${
            category === "resume-tips" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Resume Tips
        </Link>
        <Link
          href={`${basePath}/blog?category=getting-a-job`}
          className={`${styles.category__Link} ${
            category === "getting-a-job" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Getting a Job
        </Link>
      </nav>

      <div className={styles.featured__content}>
        <div className="mx-auto mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((post, index) => (
            <Link
              href={`${basePath}/blog/${encodeURIComponent(post.id)}`}
              key={`${post.id}-${index}`}
              className="flex max-w-xl flex-col items-start justify-between group"
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
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start justify-between pt-4"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time className="text-gray-500 text-[0.675rem]">
                    {new Date(
                        post.datePublished.seconds * 1000
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <a
                      href={post.category.href}
                      className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 group-hover:bg-gray-200"
                    >
                      {post.category}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-gray-600">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                      {post.summary}
                    </p>
                  </div>
                  <div className="relative mt-6 flex items-center gap-x-4">
                    <img alt="" src={post.authorImage} className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm/6">
                      <p className="font-semibold text-gray-900">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author}
                        </a>
                      </p>
                      <p className="text-gray-600">{post.role}</p>
                    </div>
                  </div>
                </article>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
