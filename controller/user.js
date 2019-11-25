const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = {
  googleOAuth: async (req, res, next) => {
    // Generate token
    console.log("req.user", req.user);

    // Return jsonwebtoken
    const payload = {
      user: {
        id: req.user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"), //???
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  }
};
