require('dotenv').config()
const express=require('express')
const cors =require('cors')
const connectDB=require('./config/db')
connectDB()

const rateLimit = require("express-rate-limit");
const postsRoutes=require('./routes/postRoute')
const app=express()
const PORT=process.env.PORT || 8001

//middlewares
app.use(express.json({
  limit: "300mb"
}))

// app.use(
//   bodyParser.urlencoded({
//     limit: "3000mb",
//     extended: true,
//   })
// );

// CORS configuration
app.use(cors());

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

app.listen(PORT,()=>{
  console.log(`server has started on http://localhost:${PORT}`)
})
module.exports-app