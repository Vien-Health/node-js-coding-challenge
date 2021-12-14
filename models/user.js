const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const config = process.env;

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 100,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 1024,
		trim: true,
	},
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign(
		{ _id: this._id, email: this.email },
		config.jwtPrivateKey,
		{ expiresIn: 60 * 60 * 2 }
	);
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(10).max(100).required(),
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user, { abortEarly: false });
};

const validateUserLogin = (userDetails) => {
	const schema = Joi.object({
		email: Joi.string().email().min(5).max(255),
		password: Joi.string().min(5).max(255),
	});
	return schema.validate(userDetails, { abortEarly: false });
};

module.exports = { User, validateUser, validateUserLogin };
