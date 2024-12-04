"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig/firebase";
import Image from "next/image";
import Link from "next/link";
import customLoader from "../../utils/Loaders/imageLoader";
import LoadingScreen from "../../utils/Loaders/Loader";

export default function BlogExerpts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const blogCollection = collection(db, "blogCollection");
        
        const recentBlogsQuery = query(
          blogCollection, 
          where("isFeatured", "==", false),
          orderBy("datePublished", "desc"), 
          limit(3)
        );

        const blogSnapshot = await getDocs(recentBlogsQuery);
        
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(blogList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recent blogs:", err);
        setError("Failed to load blog posts");
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-14 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${encodeURIComponent(post.id)}`}
              className="flex max-w-xl flex-col items-start justify-between group"
            >
              <article className="w-full">
                <div className="relative h-64 overflow-hidden rounded-xl mb-4">
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
                  <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 group-hover:bg-gray-200">
                    {post.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {post.summary}
                  </p>
                </div>
                <div className="relative mt-6 flex items-center gap-x-4">
                  <img 
                    alt={post.author} 
                    src={post.authorImage} 
                    className="h-10 w-10 rounded-full bg-gray-50" 
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      {post.author}
                    </p>
                    <p className="text-gray-600">{post.role}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}