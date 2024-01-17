const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
require("dotenv").config();

const Auth = async (req, res, next) => {
  const authheader = req.headers.authorization;

  try {
    if (authheader && authheader.startsWith("Bearer ")) {
      const token = authheader.split(" ")[1];
      //    verify token...
      const validuser = await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );
      //   ---------------check user in database--------------
      const user = User.findOne({ _id: validuser?.userId });
      if (!user) {
        res
          .status(401)
          .json({ msg: "you are not authorised to access this route" });
        return;
      }
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = Auth;
