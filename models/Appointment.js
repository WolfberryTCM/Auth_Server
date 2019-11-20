const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  name: {
    type:String,
    required:true
  },
  phone: {
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  staff: {
    type:String,
    required:true
  },
  staff_email:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  date: {
    type:String,
    required:true
  },
  time: {
    type:String,
    required:true
  },
  duration:{
    type:String,
    required:true
  },
  create_at: {
    type:Date,
    default:Date.now
  }
})

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema)