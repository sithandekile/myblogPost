import mongoose from 'mongoose'

//creating the user schema
 const userSchema=new mongoose.Schema({
  username:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true}
  // role:{type:String,enum:['manager','user'],default:'user'}
},{timestamp:true})

const userModel =mongoose.model('User',userSchema)
export default userModel;