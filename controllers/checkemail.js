const User = require("../model/usermodel");

const Checkemail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(409).json({ msg: "Email already in use" });
      return;
    }
    res.status(200).json({ msg: "All good" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = Checkemail;
