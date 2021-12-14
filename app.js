"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
require("./startup/routes")(app);
require("./startup/db")();

const config = process.env;

if (!config.jwtPrivateKey) {
	console.error(
		" requires .env file with at least a jwtPrivateKey property"
	);
	process.exit(1);
}

const port = config.PORT || 3000;

app.listen(port , () => {
	console.log(`listening at port : ${port}`)
})

module.exports = app;
