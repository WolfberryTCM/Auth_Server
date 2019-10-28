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

  hours:{
    open:[
      {
        start:{
          type: String,
          required:true
        },
          end: {
          type:String,
          required:true
        },
        day: {
          type:String,
          required:true
        },
        check:{
          type:Boolean,
          require:true
        }
      }
    ],
    hours_type:{
      type: String,
      default: "REGULAR"
    },
    is_open_now:{
      type:Boolean
    },
    isInitial:{
      type:Boolean,
      default: true
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
