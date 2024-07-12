import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const POST_CATEGORIES = [
  'Agriculture',
  'Business',
  'Education',
  'Entertainment',
  'Art',
  'Investment',
  'Uncategorized',
  'Weather',
];

const EditPost = () => {
  const { id: postId } = useParams(); // This extracts postId from the route
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null); // Store file object for thumbnail

  useEffect(() => {
    // Fetch existing post data based on postId from localStorage
    const fetchPostData = () => {
      const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const postToUpdate = existingPosts.find(post => post.id === postId);
      if (postToUpdate) {
        setTitle(postToUpdate.title);
        setCategory(postToUpdate.category);
        setDescription(postToUpdate.description);
        // Set thumbnail URL if it exists in postToUpdate
        if (postToUpdate.thumbnail) {
          setThumbnail(postToUpdate.thumbnail);
        }
      } else {
        console.error(`Post with id ${postId} not found in localStorage`);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnail(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sanitizedDescription = DOMPurify.sanitize(description, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

    // Update posts in localStorage
    let existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    existingPosts = existingPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          title: title,
          category: category,
          desc: sanitizedDescription,
          thumbnail: thumbnail, // Assuming thumbnail is a URL or base64 string after upload
        };
      }
      return post;
    });

    localStorage.setItem('posts', JSON.stringify(existingPosts));
    alert('Post updated successfully!');
    // Handle any additional logic or navigation
  };

  return (
    <section className="edit-post">
      <div className="container">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit} className="form edit-post__form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
          />
          {thumbnail && typeof thumbnail === 'string' && (
            <img src={thumbnail} alt="Thumbnail Preview" className="thumbnail-preview" />
          )}
          <button type="submit" className="btn primary">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
