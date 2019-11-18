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
  },
  appointments: [{
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
    email : {
      type:String,
      required:true
    },
    service:{
      type:String,
      required:true
    },
    date: {
      type:Date,
      required:true
    },
    duration:{
      type:Number,
      required:true
    },
    create_at: {
      type:Date,
      default:Date.now
    }
  }
],
})

module.exports = User = mongoose.model('user', UserSchema)