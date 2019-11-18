const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  clinic : {
    type: mongoose.Schema.Types.ObjectId,
    ref:'clinic'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required:true,
  },
  avatar:{
    type: String
  },
  isDoctor:{
    type:Boolean,
    default:false
  },
  isManager: {
    type:Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('user', UserSchema)