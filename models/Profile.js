const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  rating: {
    type: String
  },
  review_count: {
    type: String
  },
  services: [
    {
      title: {
        type: String,
        required:true
      },
      price: {
        type: String
      },
      duration: {
        type: String
      }
    }
  ],

  staffs:[
    {
      name: {
        type: String,
        required:true
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
