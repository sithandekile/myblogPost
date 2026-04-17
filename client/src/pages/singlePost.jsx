import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { postService } from '../services/api'
import { useAuth } from '../context/AuthContext'

const SinglePost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await postService.getPost(id)
        setPost(data)
      } catch (err) {
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return

    try {
      await postService.deletePost(id)
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Failed to delete post')
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      setAddingComment(true)
      await postService.addComment(id, { content: newComment })
      // Refresh post to get updated comments
      const updatedPost = await postService.getPost(id)
      setPost(updatedPost)
      setNewComment('')
    } catch (error) {
      console.error(error)
      alert('Failed to add comment')
    } finally {
      setAddingComment(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-200 w-2/3 mb-3"></div>
        <div className="h-4 bg-gray-200 w-full mb-2"></div>
        <div className="h-4 bg-gray-200 w-5/6"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    )
  }

  if (!post) return null

  // Normalize author
  const authorId =
    typeof post.author === 'string'
      ? post.author
      : post.author?._id

  const userId = user?.id || user?._id
  const isOwner = String(userId) === String(authorId)

  return (
    <div className="max-w-4xl mx-auto p-5">

      {/* Image */}
      {post.images && (
        <img
          src={post.images}
          alt={post.title}
          className="w-full h-[300px] object-cover rounded-xl mb-6"
        />
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        {post.title}
      </h1>

      {/* Author / Meta */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-4">
        <span className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center text-white font-bold text-lg">
          {post.author?.email?.charAt(0)?.toUpperCase() || 'U'}</span>       
        <span>{post.author?.email || 'Unknown'}</span>
        <span>•</span>
        <span>{post.viewCount || 0} views</span>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-10">
        {post.content}
      </p>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>

        {/* Add Comment Form */}
        {user && (
          <form onSubmit={handleAddComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            />
            <button
              type="submit"
              disabled={addingComment}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {addingComment ? 'Adding...' : 'Add Comment'}
            </button>
          </form>
        )}

        {/* Comments List */}
        {post.comments && post.comments.length > 0 ? (
          <div className="space-y-4">
            {post.comments.map((comment, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">
                    {comment.user?.username || comment.user?.email || 'Anonymous'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      {/* Owner Actions */}
      {isOwner ? (
        <div className="flex gap-4">
          <Link
            to={`/edit-post/${post._id}`}
            className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex gap-4 mt-6">

          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            👍 Like
          </button>

          <Link
            to={`/comments/${post._id}`}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
          >
            View Comments
          </Link>
        </div>
      )}
    </div>
  )
}

export default SinglePost