const passport = require("passport");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("config");

const GooglePlusTokenStrategy = require("passport-google-plus-token");

// GOOGLE OAUTH STRATEGY
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "1037712764162-k7fro88aoagagfbetf17e4nljlsi5kjl.apps.googleusercontent.com",
      clientSecret: "GUsXiHR770ZJZGYUKgIW0UW4"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(accessToken);
        // console.log(refreshToken);
        // console.log(profile);

        // Check whether this user exists in our DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        // If new account
        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value
          },
          name: profile.name.givenName
        });

        await newUser.save();

        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
