import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const PostItem = ({ postID, category, title, description, author, thumbnail }) => {
    console.log(author)
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    
    // Load comments from localStorage on component mount
    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem(`post_${postID}_comments`)) || [];
        setComments(storedComments);
    }, [postID]);

    const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

    const handleLike = () => {
        setLiked(!liked); // Toggle like state
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (comment.trim() !== '') {
            const newComment = {
                id: comments.length + 1, // Example: Generate unique ID
                text: comment,
                author: author, // Use the author prop
            };
            const updatedComments = [...comments, newComment];
            setComments(updatedComments);
            localStorage.setItem(`post_${postID}_comments`, JSON.stringify(updatedComments)); // Save comments to localStorage
            setComment(''); // Clear the comment input after submission
        }
    };

    return (
        <article className="post">
            <div className="post__thumbnail">
                <img src={thumbnail} alt={title} />
            </div>
            <div className="post__content">
                <Link to={`/posts/${postID}`}>
                    <h3>{postTitle}</h3>
                </Link>
                <p>{shortDescription}</p>
                <div className="post__footer">
                    <PostAuthor author={author} />
                    <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
                </div>
                <div className="post__actions">
                    <button className="btn like-btn" onClick={handleLike}>
                        {liked ? 'Liked' : 'Like'}
                    </button>
                </div>
                <div className="post__comments">
                    <h4>Comments</h4>
                    {comments.length > 0 ? (
                        <ul className="comment-list">
                            {comments.map((comment) => (
                                <li key={comment.id} className="comment-item">
                                    <strong>{comment.author}</strong>: {comment.text}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments yet.</p>
                    )}
                    <form onSubmit={handleSubmitComment} className="comment-form">
                        <input
                            type="text"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                            className="comment-input"
                        />
                        <button type="submit" className="btn comment-btn">Comment</button>
                    </form>
                </div>
            </div>
        </article>
    );
};

export default PostItem;
