import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = storedPosts.filter(post => post.authorID === currentUser.authorID);
    setPosts(userPosts);
  }, [currentUser]);

  const handleDelete = (postID) => {
    let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts = storedPosts.filter(post => post.id !== postID);
    localStorage.setItem('posts', JSON.stringify(storedPosts));
    localStorage.removeItem(`post_${postID}_comments`);
    setPosts(storedPosts);
  };

  return (
    <section className="dashboard">
      {posts.length > 0 ? (
        <div className="container dashboard__container">
          {posts.map((post) => {
            return (
              <article key={post.id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={post.thumbnail} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post.id}`} className="btn sm">View</Link>
                  <Link to={`/posts/${post.id}/edit`} className="btn sm primary">Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="btn sm danger">Delete</button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">You have no posts yet.</h2>
      )}
    </section>
  );
};

export default Dashboard;
