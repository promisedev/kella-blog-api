const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/usermodel");

const refreshtoken = async (req, res) => {
  const cookie = req.cookies;
  try {
    if (cookie && cookie?.refreshtoken) {
      // ------------------------verify the token in the cookie and generate new access token
      const refresh_token = cookie?.refreshtoken?.refreshtoken;
      if (!refresh_token) {
        res
          .status(401)
          .json({ msg: "Invalid user, no token found" });
        return;
      }
      const isuser = await jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (!isuser) {
        res.status(401).json({ msg: "Invalid token" });
        return;
      }
      // -------------------------------check if refresh
      const isRefresh = await User.findOne({
        refresh_token: refresh_token,
      });
      if (!isRefresh) {
        res
          .status(401)
          .json({ msg: "Invalid user can not generate a new token" });
        return;
      }
      // -----------------------create a new access token
      const token = await jwt.sign(
        { userId: isRefresh._id, email: isRefresh.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3600s" }
      );
      res.status(200).json({ msg: "all good", token: token });
      return;
    }
    res.status(401).json({ msg: "cannot get new token" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = refreshtoken;
