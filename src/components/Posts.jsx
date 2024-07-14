import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostItem from './PostItem';
import { DUMMY_POSTS } from '../data';

const Posts = () => {
  const { category } = useParams();
  const collection_posts = [...DUMMY_POSTS, ...(JSON.parse(localStorage.getItem('posts')) || [])];
  const [posts, setPosts] = useState(collection_posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    filterPosts();
  }, [searchTerm, posts, category]);

  const handleSearch = () => {
    filterPosts();
  };

  const filterPosts = () => {
    let filtered = posts;
    
    if (category && category !== 'undefined') { // Ensure category exists and is not 'undefined'
      filtered = filtered.filter(post => post.category.toLowerCase() === category.toLowerCase());
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <section className="posts">
      <div className="nav__search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='searchInput'
        />
        {/* <button type="button" onClick={handleSearch}>Search</button> */}
      </div>
      {filteredPosts.length > 0 ? (
        <div className="container posts__container">
          {filteredPosts.map(({ id, thumbnail, category, title, desc, authorID, author }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              author={author}
              description={desc}
              authorID={authorID}
            />
          ))}
        </div>
      ) : (
        <h2 className='center'>No Posts found</h2>
      )}
    </section>
  );
};

export default Posts;
