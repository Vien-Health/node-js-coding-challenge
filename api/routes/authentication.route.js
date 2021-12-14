const express = require("express");
const AuthenticationController = require("../controllers/authentication.controller");

const router = express.Router();

router.route("/register").post(AuthenticationController.register);
router.route("/login").post(AuthenticationController.login);

module.exports = router;
