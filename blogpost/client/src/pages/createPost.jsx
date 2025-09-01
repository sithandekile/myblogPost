import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Save, Upload } from 'lucide-react';
import {postService} from '../services/api'; // <-- Import API call

const CreatePost = ({ post, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [images, setImages] = useState(post?.images || 'default-post.jpg');
  const [newFiles, setNewFiles] = useState([]);
  const [tags] = useState([]);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const data = {
        title,
        content,
        images: newFiles.length > 0 ? newFiles : images,
        tags,
      };

      await postService.createPost(data); 
      navigate('/'); // Redirect  to home after success
    } catch (error) {
      alert('Error creating post. Please try again.');
    }
  };

  // Convert files to Base64 and store in state
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    const base64Images = await Promise.all(files.map(toBase64));
    setNewFiles(base64Images);
  };

  const addImage = () => {
    setNewFiles((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {post ? 'Edit Post' : 'Create Post'}
      </h1>

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border"
        required
      />

      {/* Content */}
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border"
        required
      ></textarea>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Images
        </label>

        <div className="flex gap-2 mb-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            type="button"
            onClick={addImage}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
          </button>
        </div>

        {/* Image Preview */}
        {newFiles.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newFiles.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

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
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{post ? 'Update Post' : 'Create Post'}</span>
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
