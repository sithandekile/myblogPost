require('dotenv').config()
const express=require('express')
const cors =require('cors')
const {connectDB}=require('./config/db')
const bodyParser=require('body-parser')
const path =require('path')
const rateLimit = require("express-rate-limit");
const postsRoutes=require('./routes/postRoute')
const app=express()
const PORT=process.env.PORT || 8001

//middlewares
app.use(express.json({
  limit: "10mb"
}))

app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

// CORS configuration
app.use(cors('*'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);


//api end points
app.get('/',(req,res)=>{
  res.send('Welcome to my backend')
})
app.use('/api/posts', postsRoutes)
app.use('/api/auth',require('./routes/authRoutes'))

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(error.status || 500).json({
    error: {
      message: error.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    },
  });
});
 connectDB().then(()=>{
app.listen(PORT,()=>{
  console.log(`server has started on http://localhost:${PORT}`)
})
 })
// module.exports = app