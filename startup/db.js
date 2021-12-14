const mongoose = require("mongoose");
const config = process.env;

const db_uri = config.DB_URI || "mongodb://localhost/node-challenge";

module.exports = function () {
	mongoose.connect(db_uri)
		.then(() => console.log(`connected to MongoDB: ${db_uri}`))
		.catch((e) => {
			console.error(e);
			process.exit(1);
		});
};
