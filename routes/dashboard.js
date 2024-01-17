const express = require("express");

const User = require("../controllers/user");
// const Adverts = require("../controllers/adverts");
// const Products = require("../controllers/products");
const router = express.Router();

router.route("/user").post(User);


module.exports = router;
