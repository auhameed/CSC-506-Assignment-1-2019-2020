import React, { useState, useEffect } from "react";
import axios from "axios";

import Posts from "./Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:4000/posts");
      setPosts(res.data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="main">
      <h1 id="h1">Welcome To Our Website</h1>
      <div className="post-section">
        <h2>All Posts</h2>
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Home;
