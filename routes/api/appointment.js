const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route  PUT api/appointment
// @desc   Add User appointment
// @access Private
router.put('/',[auth,[check('email','Email is required').not().isEmpty(),check('service','Service is required').not().isEmpty(),check('date','Date is required'),check('duration','Duration is required')]],async (req,res)=>{

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()})
  }

  const {
    email,service,date,duration,
  } = req.body;

  const newAppointment = {
    email,service,date,duration
  }
  
  try {
    const user = await User.findOne({_id:req.user.id});

    user.appointments.unshift(newAppointment);

    await user.save();

    res.json(user)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

module.exports = router;
