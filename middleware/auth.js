const jwt = require("jsonwebtoken");
const config = process.env;

function auth(req, res, next) {
	const Bearer = req.get("Authorization");
	if (!Bearer)
		return res.status(401).send("No token provided! Access denied");

	const token = Bearer.slice("Bearer ".length);

	try {
		const decodedPyload = jwt.verify(token, config.jwtPrivateKey);
		req.user = decodedPyload;
		next();
	} catch (err) {
		res.status(400).send("invalid token");
	}
}

module.exports = auth;
