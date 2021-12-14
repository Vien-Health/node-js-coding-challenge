"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
require("./startup/routes")(app);
require("./startup/db")();

module.exports = app;
