const { User } = require("../../models/user");
class UserProfileController {
	static async profile(req, res) {
		try {
			const user = await User.findById(req.user._id);
			if (!user)
				return res.status(404).send(`user not found`);

			const safeUser = { name: user.name, email: user.email };
			return res.status(200).json(safeUser);
		} catch (e) {
			res.status(500).json({ error: e });
		}
	}
}

module.exports = UserProfileController;
