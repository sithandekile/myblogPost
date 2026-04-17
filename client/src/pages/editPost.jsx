import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { postService } from '../services/api'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState({
    title: '',
    content: '',
    images: [],
    category: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await postService.getPost(id)

        setPost({
          title: data.title || '',
          content: data.content || '',
          images: data.images || '',
          // category: data.category || '',
        })

        // show existing image
        if (data.images && data.images.length > 0) {
          setPreview(data.images)
        }

      } catch (error) {
        console.error('Failed to fetch post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  setPost((prev) => ({
    ...prev,
    images: [file], // store FILE
  }))

  setPreview(URL.createObjectURL(file))
}

 const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    setSaving(true)

    const formData = new FormData()
    formData.append('title', post.title)
    formData.append('content', post.content)
    // formData.append('category', post.category)

    if (post.images) {
      formData.append('image', post.images)
    }

    await postService.updatePost(id, formData)

    navigate(`/blog/${id}`)
  } catch (error) {
    console.error(error)
  } finally {
    setSaving(false)
  }
}

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 animate-pulse">
        <div className="h-10 bg-gray-200 mb-4 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Post
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Title */}
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Post Title"
          required
        />

        {/* Content */}
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          className="border p-3 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Write your post..."
          required
        />

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-cover rounded-lg"
          />
        )}

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-sm"
        />

        {/* Category */}
        {/* <select
          name="category"
          value={post.category}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">Select Category</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="education">Education</option>
        </select> */}

        {/* Buttons */}
        <div className="flex gap-4 mt-4">

          <button
            type="submit"
            disabled={saving}
            className={`px-5 py-2 rounded-lg text-white transition ${
              saving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-sky-600 hover:bg-sky-700'
            }`}
          >
            {saving ? 'Updating...' : 'Update Post'}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  )
}

export default EditPost