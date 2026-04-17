import { useEffect, useState } from 'react';
import { postService } from '../services/api';
import BlogCard from '../components/card';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [queryInput, setQueryInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const fetchPosts = async () => {
    try {
      const data = await postService.getAllPosts(page);
      setPosts(data.posts || data);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    if (queryInput.trim() === '') setSearching(false);
  }, [queryInput]);

  const handleSearch = async () => {
    if (queryInput.trim() === '') {
      setSearching(false);
      return;
    }
    try {
      const results = await postService.searchPosts(queryInput);
      setSearchResults(results);
      setSearching(true);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        All Posts
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-10">
        <div className="flex w-full max-w-xl shadow-md rounded-xl overflow-hidden">
          <input
            type="text"
            placeholder="Search posts..."
            className="flex-1 px-4 py-3 outline-none"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white px-6 hover:bg-orange-600 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(searching ? searchResults : posts).map((post) => (
          <BlogCard
            key={post._id || post.id || post.title}
            post={post}
          />
        ))}
      </div>

      {/* Pagination */}
      {!searching && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium text-gray-700">
            Page {page}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}