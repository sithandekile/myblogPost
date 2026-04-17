const express = require('express');
const router = express.Router();
const { userSignUp, userSignIn,fetchUsers } = require('../controllers/authController');
// const { authValidation } = require('../middlewares/validationMiddleware');

router.post('/register', userSignUp);
router.post('/login', userSignIn);
router.get('/users',fetchUsers)

module.exports = router;
