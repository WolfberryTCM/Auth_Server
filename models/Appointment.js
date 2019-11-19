const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  doctor_email:{
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
})

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema)