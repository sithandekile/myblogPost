const express=require('express')
const {createPost,getAllPosts,getSinglePost,updatingPost,deletePost}=require('../controllers/bpostController')
const router=express.Router()

//Routes
router.post('/',createPost)
router.get('/',getAllPosts)
router.get('/:id',getSinglePost)
router.put('/:id',updatingPost)
router.delete('/id',deletePost)

module.exports=router;
