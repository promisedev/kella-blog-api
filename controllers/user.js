const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const dashboardUser = async (req, res) => {
  const { refreshtoken } = req.cookies.refreshtoken;

  try {
    const user = await jwt.verify(
      refreshtoken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!user) {
      res.status(404).json({ msg: "No user found" });
      return;
    }
    const loggeduser = await User.findOne({ _id: user.userId });
    res.status(200).json({ user: loggeduser });
  } catch (error) {
    console.log(error);
  }
};

module.exports = dashboardUser;
