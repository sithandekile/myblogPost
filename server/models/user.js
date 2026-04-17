const mongoose=require('mongoose')

//Creating the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    default: '',
  },
  image: {
    type: String, // URL or base64 string
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  posts:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post'
  },
  Date:{type:Date,default:Date.now},

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

  
