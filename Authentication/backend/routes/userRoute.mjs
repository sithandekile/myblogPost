import express from 'express'
import {signUp,signIn} from '../controllers/userContoller.mjs'
const router =express.Router()

// authentication Routes
router.post('/register',signUp)
router.post('/login',signIn)

 export default router