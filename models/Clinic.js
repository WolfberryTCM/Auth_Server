const mongoose = require('mongoose')

const ClinicSchema = new mongoose.Schema({
  name :{
    type:String,
    required:true
  },
  Address : {
    type:String,
    required: true
  },
  website: {
    type: String
  },
  date: {
    type:Date,
    default: Date.now
  }
})