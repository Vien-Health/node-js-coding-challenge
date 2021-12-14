const { User, validateUser, validateUserLogin } = require("../../models/user");
const bcrypt = require("bcrypt");

class AuthenticationController {
	static async register(req, res) {
		try {
			const { error } = validateUser(req.body);
			if (error)
				return res.status(400).send({
					error: error.details.map(
						(el) => el.message
					),
				});
			const userEmailExists = await User.findOne({
				email: req.body.email,
			});

			if (userEmailExists)
				return res
					.status(400)
					.send(
						`User with email : ${req.body.email} exists `
					);

			let user = new User({ ...req.body });
			const hashSalt = await bcrypt.genSalt();
			user.password = await bcrypt.hash(
				user.password,
				hashSalt
			);
			await user.save();

			const token = user.generateAuthToken();
			return res.status(201).json({ token });
		} catch (e) {
			res.status(500).json({ error: e });
		}
	}

	static async login(req, res) {
		try {
			const { error } = validateUserLogin(req.body);
			if (error)
				return res.status(400).send({
					error: error.details.map(
						(el) => el.message
					),
				});

			const user = await User.findOne({
				email: req.body.email,
			});

			if (!user)
				return res
					.status(404)
					.send(`user does not exist`);

			const isValidPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);

			if (!isValidPassword)
				return res.status(400).send(`invalid Password`);

			const token = user.generateAuthToken();
			return res.status(200).json({ token });
		} catch (e) {
			res.status(500).json({ error: e });
		}
	}
}

module.exports = AuthenticationController;
