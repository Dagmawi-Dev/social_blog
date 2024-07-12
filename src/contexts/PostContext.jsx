// PostContext.js
import React, { createContext, useState, useEffect } from 'react';
import { DUMMY_POSTS } from '../data'; // Assuming DUMMY_POSTS is your initial data

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const mergedPosts = [...storedPosts, ...DUMMY_POSTS];
    setPosts(mergedPosts);
    setFilteredPosts(mergedPosts); // Initialize filteredPosts with all posts
  }, []);

  const filterPosts = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <PostContext.Provider value={{ posts: filteredPosts, filterPosts }}>
      {children}
    </PostContext.Provider>
  );
};
