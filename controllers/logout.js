const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Logout = async (req, res) => {
  const cookie = req.cookies.refreshtoken;
  try {
    if (!cookie) {
      res.sendStatus(204);
      return;
    }
    const refresh_token = cookie.refreshtoken;
    const isuser = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    if (!isuser) {
      res.sendStatus(204);
      return;
    }
    // ----------------------remove refreshtoken from database and cookie
    await User.findByIdAndUpdate(isuser.userId, { refresh_token: "" });
    res
      .clearCookie("refreshtoken", { httpOnly: true })
      .json({ msg: "looged out successfully" }); //secure:true
  } catch (error) {
    console.log(error);
  }
};

module.exports = Logout;
