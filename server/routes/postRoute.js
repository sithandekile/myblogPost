const express=require('express')
const {createPost,getAllPosts,getSinglePost,updatePost,deletePost,addComment}=require('../controllers/bpostController')
const router=express.Router()
const {protect,authorize}=require('../middleware/auth')
const {upload}=require('../middleware/multer')

router.use(protect)

router.post('/',upload.single('image'), createPost)
router.get('/', getAllPosts)
router.get('/:id', getSinglePost)
router.put('/:id',upload.single('image'),authorize, updatePost)
router.delete('/:id',authorize, deletePost)
router.post('/:id/comments', addComment)

module.exports=router;
