import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Save, Upload } from 'lucide-react';
import {postService} from '../services/api'; // <-- Import API call

const CreatePost = ({ post, onCancel }) => {
  const [formData, setFormData] = useState({ 
    title: post?.title || '',
    content: post?.content || '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.content || !selectedImage) {
      alert('Please fill all fields and select an image');
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('image', selectedImage);

      await postService.createPost(data);
      alert('Post created successfully');
      navigate('/blog'); // Redirect to home after success
      setFormData({ title: '', content: '' });
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setSelectedImage(null);
      setImagePreview(null);
      onCancel && onCancel();

    } catch (err) {
      console.error('Error creating post:', err.response || err);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {post ? 'Edit Post' : 'Create Post'}
      </h1>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border"
        required
      />

      {/* Content */}
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border"
        required
      ></textarea>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Preview
          </label>
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500  text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{post ? 'Update Post' : 'Create Post'}</span>
        </button>
      </div>
    </form>
  );
};

export default CreatePost;