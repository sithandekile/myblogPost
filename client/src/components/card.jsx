import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({ post }) {
  const navigate = useNavigate();
  if (!post) return null;

  return (
    <div
      onClick={() => navigate(`/blog/${post._id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={post.images || post.image || '/default-post.jpg'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h1 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {post.title}
        </h1>

        <p className="text-sm text-gray-500 line-clamp-3">
          {post.content?.slice(0, 80)}...
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-gray-400">
            {post.viewCount || 0} views
          </span>

          <span className="text-orange-500 text-sm font-medium">
            Read more →
          </span>
        </div>
      </div>
    </div>
  );
}