const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, website, location } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (name) profileFields.name = name;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          {
            new: true
          }
        );
        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/profile
// @desc   Delete profile, user & posts
// @access Private

router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove users posts

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/profile/service
// @desc   Add service
// @access Private
router.put(
  '/service',
  [
    auth,
    [
      check('title','Title is required').not().isEmpty()
    ]
  ],
  async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors:errors.array()
      })
    }

    const {
      title,
      price,
      duration
    } = req.body

    const newService = {
      title,price,duration
    }

    try {
      const profile = await Profile.findOne({user:req.user.id});

      profile.services.unshift(newService);

      await profile.save();

      res.json(profile);
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
)

// @route  DELETE api/profile/service/:service_id
// @desc   Delete service from profile
// @access Private

router.delete('/service/:service_id', auth,async(req,res)=> {
  try {
    const foundProfile = await Profile.findOne({user:req.user.id});

    const serviceIds = foundProfile.services.map(
      service => service._id.toString()
    )
    // If i don't add .toString(), it returns this wired mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put/service/5

    const removeIndex = serviceIds.indexOf(req.params.service_id);

    if(removeIndex === -1) {
      return res.status(500).json({msg:"Server Error"})
    } else {
      // There console logs help me figure it out
      console.log("serviceIds",serviceIds);
      console.log("typeof serviceIds",typeof serviceIds);
      console.log("req.params",req.params);
      console.log("removed",serviceIds.indexOf(req.params.service_id));

      foundProfile.services.splice(removeIndex,1);

      await foundProfile.save();

      return res.status(200).json(foundProfile);
    }
  }catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

// @route  PUT api/profile/staff
// @desc   Add profile staff
// @access Private
router.put('/staff',[auth,[check('name','Name is required').not().isEmpty()]],async (req,res)=>{
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()})
  }

  const {
    name
  } = req.body;

  const newStaff = {
    name
  }
  
  try {
    const profile = await Profile.findOne({user:req.user.id});

    profile.staffs.unshift(newStaff);

    await profile.save();

    res.json(profile)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

// @route  DELETE api/profile/staff
// @desc   Delete profile staff
// @access Private
router.delete('/staff/:staff_id',auth,async (req,res)=> {
  try {
    const foundProfile = await Profile.findOne({user:req.user.id});
    const staffIds = foundProfile.staffs.map(staff=>staff._id.toString());

    const removeIndex = staffIds.indexOf(req.params.staff_id);

    if(removeIndex === -1) {
      return res.status(500).json({msg:"Server Error"})
    } else {
      foundProfile.staffs.splice(removeIndex,1);
      await foundProfile.save();
      return res.status(200).json(foundProfile)
    } 
  }catch(err) {
      console.error(err);
      return res.status(500).json({msg:"Server Error"})
  }
})

// @route  POST api/profile/hours
// @desc   Update profile hours
// @access Private
router.post('/hours',auth, async (req,res)=> {
  try{
    const {hours} = req.body;
    let profileField = {};
    profileField.user = req.user.id;
    if(hours) profileField.hours = hours;

    let profile = await Profile.findOneAndUpdate(
      {user:req.user.id},
      {$set:profileField},
      {
        new:true
      }
    )
    res.json(profile)  
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error')
  }
})

module.exports = router;
