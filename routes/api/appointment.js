const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Appointment = require("../../models/Appointment");

// @route  POST api/appointment
// @desc   Create an appointment
// @access Private
router.post(
  "/",
  [
    check("title", "Service is required")
      .not()
      .isEmpty(),
    check("date", "Date is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      staff,
      staff_email,
      title,
      price,
      date,
      time,
      duration
    } = req.body;

    try {
      const newAppointment = new Appointment({
        name,
        phone,
        staff,
        staff_email,
        email,
        title,
        price,
        date,
        time,
        duration
      });

      const appointment = await newAppointment.save();

      res.json(appointment);
    } catch (err) {
      console.log(err.message);
      res.status("500").send("Server Error");
    }
  }
);

// @route GET api/appointment
// @desc  GET all appointments
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const { isDoctor, method } = user;
    let email;
    if (method === "local") {
      email = user.local.email;
    } else {
      email = user.google.email;
    }
    let appointments = [];
    if (isDoctor) {
      appointments = await Appointment.find({ staff_email: email });
    } else {
      appointments = await Appointment.find({ email: email });
    }

    res.json(appointments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/appointment/:id
// @desc  Get post by ID
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(400).json({ msg: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        msg: "Post not found"
      });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
