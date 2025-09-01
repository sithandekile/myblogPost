//home or postlisting page
import { useEffect, useState } from 'react';
import { postService } from '../services/api';
import { Link } from 'react-router-dom';
import CreatePost from './createPost'

export default function blog() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const fetchPosts = async () => {
    try {
      const data = await postService.getAllPosts(page);
      setPosts(data.posts || data);
      setTotalPages(data.totalPages || 5);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleSearch = async () => {
    if (query.trim() === '') {
      setSearching(false);
      return;
    }
    try {
      const results = await postService.searchPosts(query);
      setSearchResults(results);
      setSearching(true);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div>
      {/* <UseApi /> */}
      <h1 className="text-2xl font-bold mb-4 text-center">Recent Posts</h1>

      {/* Searching bar */}
      <div className="flex gap-2 justify-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          className="border p-2 rounded w-1/2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/*posts rendering*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        {(searching ? searchResults : posts).map((post) => (
          <div key={post._id} className="border p-2 shadow-lg rounded">
            {post.images && (
              <img
                src={post.images}
                alt={post.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <Link to={`/posts/${post._id}`} className="text-lg font-semibold block hover:underline">
              {post.title}
            </Link>
          </div>
        ))}
      </div>

      {/* for pagination */}
      {!searching && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">{page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
          <div><CreatePost/>  </div>
        </div>
      )}
    </div>
  );
};


