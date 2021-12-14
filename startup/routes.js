const express = require("express");

const userAuthentication = require("../api/routes/authentication.route");
const userProfile = require("../api/routes/user_profile.route");

module.exports = function (app) {
	app.use(express.json());
	app.use("/api/", userAuthentication);
	app.use("/api/", userProfile);
};
