"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/MovingBorders";

interface BlogPost {
  title: string;
  
  description: string;
  pubDate: string;
  link: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(3);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace 'YOUR_MEDIUM_USERNAME' with your actual Medium username
        const response = await fetch(`/api/medium-posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching Medium posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const loadMore = () => {
    setVisiblePosts(prev => prev + 3);
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 w-full">
        <h1 className="heading">
          Latest <span className="text-purple">blog posts</span>
        </h1>
        <div className="w-full mt-12 flex justify-center">
          <p className="text-white-100">Loading posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 w-full">
      <h1 className="heading">
        Latest <span className="text-purple">blog posts</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-2 grid-cols-1 gap-10">
        {posts.slice(0, visiblePosts).map((post, index) => (
          <Button
            key={index}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem * 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <motion.div 
              className="p-3 py-6 md:p-5 lg:p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => window.open(post.link, '_blank')}
            >
              <div className="flex items-center gap-3 text-white-100 text-sm mb-2">
                <span>{formatDate(post.pubDate)}</span>
              </div>
              <h2 className="text-start text-xl md:text-2xl font-bold">
                {post.title}
              </h2>
              <p className="text-start text-white-100 mt-3 font-semibold line-clamp-2">
                {post.description}
              </p>
            </motion.div>
          </Button>
        ))}
      </div>

      {visiblePosts < posts.length && (
        <div className="w-full flex justify-center mt-10">
          <Button
            duration={15000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem * 0.96)`,
            }}
            className="px-8 py-4 text-white"
            onClick={loadMore}
          >
            Load More
          </Button>
        </div>
      )}

      <div className="w-full flex justify-center mt-10">
        <Button
          duration={15000}
          borderRadius="1.75rem"
          style={{
            background: "rgb(4,7,29)",
            backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            borderRadius: `calc(1.75rem * 0.96)`,
          }}
          className="px-8 py-4 text-white"
          onClick={() => window.open('https://medium.com/@abhishek01patil', '_blank')}
        >
          View All Posts on Medium
        </Button>
      </div>
    </section>
  );
};

export default Blog; 