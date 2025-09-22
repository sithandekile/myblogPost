import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import {connectDB} from './config/db.mjs'
import userRouter from './routes/userRoute.mjs'
//initialize express
const app = express()
const PORT=process.env.PORT || 8080

// miiddleware
app.use(express.json())
app.use(cors(
process.env.CLIENT_URL
))

//routes Endepoints
// app.get('/',(req,res)=>{
//   res.send('WElcome to my backend authentication!')
// })
app.use('/api/users',userRouter)

connectDB();


app.listen(PORT,()=>{
  console.log(`server in now running on http://localhost:${PORT}`)
})
export default app;
