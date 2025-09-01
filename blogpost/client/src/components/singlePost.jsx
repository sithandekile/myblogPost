import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await postService.getPost(id);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(id);
        alert('Post deleted successfully');
        navigate('/'); //go back to home
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete post');
      }
    }
  };

  if (!post) return <p>Loading...</p>;

  //handling the string and object
  const authorId = typeof post.author === 'string' ? post.author : post.author?._id;

  // Debugging
  console.log('Logged-in user:', user);
  console.log('Post author ID:', authorId);
  console.log('Is owner?', String(user?.id) === String(authorId));

  return (
    <div className='max-w-[70%] border shadow-lg grid items-center mx-auto p-5'>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mb-10 ">{post.content}</p>

      {/*showing these buttons only if the user is the owner of the post*/}
      {user && String(user.id) === String(authorId) && (
        <>
          <Link to={`/edit-post/${post._id}`} className='bg-orange-500 p-2 text-center block'>
            Edit
          </Link>
          <button onClick={handleDelete} className='bg-orange-500 p-2 mt-10'>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default SinglePost;
