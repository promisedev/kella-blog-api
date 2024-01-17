const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
    type: String,
    require: [true, "provide a valid email address"],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  userpassword: { type: String, required: true },
  refresh_token: { type: String, default: "" },
  role: { type: Array, default: ["user"] },
});

module.exports = mongoose.model("user", UserSchema);
