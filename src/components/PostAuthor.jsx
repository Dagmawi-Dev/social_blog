import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/avatar1.jpg';
import { IoPersonSharp } from "react-icons/io5";

const PostAuthor = ({ author }) => {
  return (
    <div className="post__author">
      <div className="post__author-avatar">
        <img src={Avatar} alt="" />
      </div>
      <div className="post__Author-details">
        <h5>By: {<IoPersonSharp className="hom"/>}</h5>
      </div>
    </div>
  );
};

export default PostAuthor;
