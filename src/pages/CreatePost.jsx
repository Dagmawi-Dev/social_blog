import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
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
  'list',
  'bullet',
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
// The main functional component.
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const currentUser  = JSON.parse(localStorage.getItem('currentUser'))

  //Handles form submission.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: Remove HTML tags from description
    const sanitizedDescription = description.replace(/<\/?[^>]+(>|$)/g, '');

    //Constructs a new post object.
    const newPost = {
      thumbnail: thumbnailPreview, // Use the URL for the thumbnail
      category: category,
      title: title,
      author: currentUser.name,
      desc: sanitizedDescription, 
      authorID: currentUser.authorID, 
    };

    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = [...existingPosts, newPost];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    setTitle('');
    setCategory('Uncategorized');
    setDescription('');
    setThumbnail(null);
    setThumbnailPreview(null);

    alert('Post created successfully!');
  };


  //Handles changes to the file input for the thumbnail.
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setThumbnail(null);
      setThumbnailPreview(null);
    }
  };

  return (
    // JSX structure of the component. with inputs for the title, category, description, and thumbnail.
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit} className="form create-post__form">
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
            {/* Maps through the POST_CATEGORIES array to create an option element for each category. */}
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
            onChange={handleThumbnailChange}
            accept="image/png, image/jpeg, image/jpg"
            required
          />
          {thumbnailPreview && (
            <div className="thumbnail-preview">
              <img src={thumbnailPreview} alt="Thumbnail Preview" />
            </div>
          )}
          <button type="submit" className="btn primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
