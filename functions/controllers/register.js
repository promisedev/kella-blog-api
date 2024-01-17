const bcrypt = require("bcryptjs");
const User = require("../model/usermodel");

const Register = async (req, res) => {
  const {
  
    email,
    firstname,
    lastname,
    password,
  } = req.body;

  console.log(req.body)
  try {
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(409).json({ msg: "user already exist" });
      return;
    }
    const newuser = await User.create({
      email,
      firstname,
      lastname,
      userpassword: hashpassword,
     
    });
    // ----------------------------send user email

    res.status(201).json({
      newuser,
    });
    return;
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = Register;
