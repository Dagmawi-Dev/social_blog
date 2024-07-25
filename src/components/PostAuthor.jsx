import React from 'react';
import { IoPersonSharp } from "react-icons/io5";

const PostAuthor = ({ author }) => {
  author = author ? author : 'Guest'
  return (
    <div className="post__author">
      <div className="post__author-avatar">
        <IoPersonSharp className="hom"/>
      </div>
      <div className="post__Author-details">
        <h5>By: {author}</h5>
      </div>
    </div>
  );
};

export default PostAuthor;
