const express = require("express");
const Register = require("../controllers/register");
const Login = require("../controllers/login");
const Refresh = require("../controllers/refresh");
const Logout = require("../controllers/logout");
const GetProducts = require("../controllers/getblogs");
const GetAdvert = require("../controllers/getadverts");
const SingleProduct = require("../controllers/singleblog");
const Products = require("../controllers/blogs");
const Adverts = require("../controllers/adverts");
const router = express.Router();

// --------------------------------

router.route("/").get((req, res) => {
  res.send("Gloor API");
});
// router.route("/auth").post()
// router.route("/email").post(Checkemail);
router.route("/blog/id").get(SingleProduct);
router.route("/blogs").get(GetProducts);
router.route("/adverts").get(GetAdvert);
router.route("/blog").post(Products);
router.route("/advert").post(Adverts);
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/refresh").get(Refresh);
router.route("/logout").get(Logout);

module.exports = router;
