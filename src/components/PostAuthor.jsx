import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/avatar1.jpg';

const PostAuthor = ({ author }) => {
  return (
    <div className="post__author">
      <div className="post__author-avatar">
        <img src={Avatar} alt="" />
      </div>
      <div className="post__Author-details">
        <h5>By: {author}</h5>
      </div>
    </div>
  );
};

export default PostAuthor;
