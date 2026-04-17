const mongoose = require('mongoose');
const Post = require('../models/posts');
const { uploadImages, deleteImage } = require('../controllers/fileController');
const cloudinary = require('cloudinary').v2;
// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { ...postData } = req.body;
    const file = req.file; 

    if (!file) {
      return res.status(400).json({ message: "image not found" });
    }

    const result = await cloudinary.uploader.upload(file.path);

    const post = new Post({
      ...postData,
      author: req.user.id,
      images: result.secure_url,
    });

    await post.save();

    res.status(201).json({ success: true, post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL POSTS (PAGINATION)
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ deletedAt: null })
      .skip(skip)
      .limit(limit)
      .populate('author', 'email')
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments({ deletedAt: null });

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      posts,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE POST
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'email username')
      .populate('comments.user', 'username email');

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment view count
    await post.incrementViewCount();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
};


// UPDATE POST (WITH CLOUDINARY IMAGE REPLACEMENT)
exports.updatePost = async (req, res) => {
  try {
    const { title, content, category } = req.body

    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    //  FIX AUTH
    const userId = req.user._id || req.user.id

    if (
      post.author.toString() !== userId.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" })
    }

    let imageUrl = post.images?.[0]

    //  HANDLE FILE UPLOAD
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      })

      imageUrl = result.secure_url
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        images: imageUrl || post.images,
      },
      { new: true }
    )

    res.json(updatedPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Update failed" })
  }
};

// ADD COMMENT TO POST
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;

    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add comment using the schema method
    await post.addComment(req.user.id, content);

    // Populate the new comment's user
    await post.populate('comments.user', 'username email');

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding comment' });
  }
};

// DELETE POST (WITH CLOUDINARY DELETE)
exports.deletePost = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    // Authorization check
    if (post.author.toString() !== req.user && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to delete this post" });
    }

    // Delete all Cloudinary images belonging to this post
    if (post.images && post.images.length > 0) {
      for (const img of post.images) {
        await deleteImage(img);
      }
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
