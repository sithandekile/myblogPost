import userModel from '../models/user.mjs'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

//creating the signup
export const signUp= async(req,res)=>{
  const{username,email,password}=req.body
  if(!username || !email || !password)
    res.send('Fill up required fields')
  try{
    const existingUser=await userModel.findOne({email})
    if(existingUser)return res.status(400).json({message:"User already exists"})

 //if the user does not exist lets hash the password first then we create the new user
    const hashed= await bcryptjs.hash(password,10)
    const user=await userModel.create({username, email, password:hashed})

    //then lets generate the token
    const token =jwt.sign({userId:user._id},process.env.JWT_SECRET)
     res.json({token},process.env.JWT_EXPIRES_IN)
  }catch(err){
  res.status(403).json(err.message)
  }
};
export const signIn=async(req,res)=>{
  const{email,password}=req.body
  if(!email || !password)
    res.send('fill up the required fields')
  try{
   const user=await userModel.findOne({email})
   if(!user)return res.status(404).json({message:'User not found'})

    //if found lets compare passwords
    const passMatch=await bcryptjs.compare(password,user.password)
    if(!passMatch)return res.status(401).json({message:'Invalid credentials'})

    //then generate token
    const token =jwt.sign({userId:user._id},process.env.JWT_SECRET)
    res.json({token},process.env.JWT_EXPIRES_IN)
  }catch(err){
  res.status(403).json(err.message)
  }
}
