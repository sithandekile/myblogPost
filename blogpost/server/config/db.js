require('dotenv').config();
const mongoose=require('mongoose')

//conecting to the database
const connectDB=async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database Connected')
  } catch (error) {
    console.error('Database not connected',error.message)
  }
}
module.exports=connectDB;