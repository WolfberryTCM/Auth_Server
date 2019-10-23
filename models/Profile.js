const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name:{
    type: String
  },
  website: {
    type: String
  },
  location:{ 
    type: String
  },
  rating:{
    type: String
  },
  review_count: {
    type: String
  },
  services:[
    {
      name: {
        type:String
      },
      price: {
        type:String
      }
    }
  ],
  date: {
    type:Date,
    default:Date.now
  }
})

module.exports = Profile = mongoose.model('profile',ProfileSchema)