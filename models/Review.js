const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  appointment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'appointment'
  },
  content: {
    type:String
  },
  rating: {
    type:Number
  },
  date: {
    type:Date,
    default:Date.now
  }
})

module.exports = Review = mongoose.model('review', ReviewSchema)