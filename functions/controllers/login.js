const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config()
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const isuser = await User.findOne({ email: email });

    if (!isuser) {
      res.status(400).json({ msg: "Invalid username try again" });
      return
    }
    // ----------------------there is user checking for password...
    const isPassword = await bcrypt.compare(password, isuser.userpassword);
    
    if (!isPassword) {
      res
        .status(400)
        .json({ msg: "Password is not correct, please provide password" });
        return
    }
    // ----------------------------create jsonwebtoken--------------------

    const accesstoken = await jwt.sign({userId:isuser._id, email:isuser.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"3600s"})
const refreshtoken = await jwt.sign({userId:isuser._id, email:isuser.email},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"2d"})
    
    //------------------------save refreshtoken in database
await User.findByIdAndUpdate(isuser._id,{refresh_token:refreshtoken},{})
  // ----------------------save token as a cookie
    res.cookie("refreshtoken", {refreshtoken}, {
      httpOnly: true, maxAge:24 * 60*60*1000
    }).json({accesstoken});
  } catch (error) {
    console.log( {error: error.message}) ;
  }
};

module.exports = Login;
