const Post =require('../models/posts')
const {uploadImages} =require('../controllers/uploadController')

exports.createPost= async (req, res) => {
    try {
      const { images, ...others } = req.body;
      const uploadedFiles = [];

      if (images) {
        for (const file of images) {
          const result = await uploadImages(file);
          uploadedFiles.push(result.documentLink);
        }
      }
      const postData = {
        ...others,
        images: uploadedFiles,
        // bloger: req.user.id,
      };
     
      const post = new Post(postData);
      await post.save();

      res.status(201).json({
        success: true,
        message: "Post created successfully and pending approval",
        data: post,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error creating post",
        error: error.message,
      });
    }
  }
  exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ deletedAt: null })
      .skip(skip)
      .limit(limit)
      // .populate('author', 'name email')
      // .populate('category', 'name');

    const total = await Post.countDocuments({ deletedAt: null });

    res.json({ total, page, pages: Math.ceil(total / limit), posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: error.message });
  }
};
  exports.getSinglePost=async(req,res)=>{
    try{
      const post=await Post.findById(req.params.id)
      if(!post) return res.status(404).json({message:'No posts found'})
        res.json(post)
    }catch(error){
      res.status(500).json(error.message)
    }
  }
//updating the post
exports.updatingPost=async(req,res)=>{
  try{
    const post =await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!post) return res.status(404).json({message:'No posts found'})
      res.json(post)
  }catch(error){
    res.status(500).json(error.message)
  }
}
//deleting a certain post
exports.deletePost=async(req,res)=>{
  try{
    const post=await Post.findByIdAndDelete(req.params.body)
    return res.status(200).json({message:'successfully deleted the post',post})
  }catch(error){
    res.status(500).json(error.message)
  }
}



