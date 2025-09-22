import mongoose from 'mongoose'

//connection to database
export const connectDB= async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database Connected')
  } catch (error) {
    console.error('Database not Connected')
  }
}