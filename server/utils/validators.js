const {check}=require('express-validator')

const registerValidator=[
  check('name')
  .notEmpty()
  .withMessage('username is required'),

  check('email')
  .isEmail()
  .withMessage('Invalid email')
  .notEmpty()
  .withMessage('Email is required'),

  check('password')
  .isLength({min:6})
  .withMessage('Password should be 6 characters long')
  .notEmpty()
  .withMessage('Password required')
];

const loginValidator=[
  check('email')
  .notEmpty()
  .isEmail()
  .withMessage('Invalid email')
  .withMessage('Email is required'),

  check('password')
  .notEmpty()
  .isLength({min:6})
  .withMessage('passsword is required')
];

const emailValidator=[
  check('email')
  .isEmail()
  .withMessage('invalid email')
  .notEmpty()
  .withMessage('Email is requred')
]
module.exports={registerValidator,loginValidator,emailValidator}