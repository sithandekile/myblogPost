const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { generateVerifyCode } = require('../utils/generateCode')
require('dotenv').config()

exports.userSignUp=async(req,res)=>{
  try{
    const{username,email,password,role}=req.body
    const existingUser=await User.findOne({email})
      if(existingUser)return res.status(400).json({message:"User Already Exist"})

      //if the user does not exist yet lest hash the password first then create a new user
    const hashed=await bcrypt.hash(password,10)
    const user=await User.create({username,email,password:hashed,role})
    
      //generate the web token
    const token= jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'2d'})
     res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
}catch(err){
    res.status(500).json({message:err.message})
}
}

exports.userSignIn=async(req,res)=>{
  try{
  const{email,password,role}=req.body
  const user=await User.findOne({email})
  if(!user)return res.status(404).json({message:'User not found'})

    //checking if user credentials match 
    const match = await bcrypt.compare(password,user.password)
    if(!match)return res.status(403).json({message:'Invalid credentials'})

      // if they match lets generate the web token
  const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'2d'})
    res.json({ token, user: { id: user._id, email: user.email } });

  }catch(err){
        res.status(500).json({message:err.message})
  }

}

exports.fetchUsers=async(req,res)=>{
  try{
    const users=await User.find()
    .select('-password')
    res.json({ users })
  }catch(err){
    res.status(500).json({message:err.message})
  }
}


exports.verifyCode=async(req,res,next)=>{
  try{
const{email}=req.body

const user=await User.findOne({email})
if(!user)return res.status(404).json({message:'user not found'})

if(user.isVerified)return res.status(400).json({message:'user Already exist'})

  const code=generateVerifyCode(6)

  user.verificationCode=code
  await user.save()
  
  }catch(error){
res.status(500).json({message:error.message})
  }
}
