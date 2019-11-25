const passport = require("passport");

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
    async (accessToken, refreshToken, profile) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);
