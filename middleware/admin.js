// This module contains all middleware which are used for admin resource

const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();

module.exports.isAdmin = async (req, res, next) => {
	// const authHeader = req.headers["authorization"];
	// const token = authHeader && authHeader.split(' ')[1]
	const token = req.cookies["authcookie"];

	if (token == null) {
		return res
			.sendStatus(400)
			.send({ auth: false, message: "Invalid token" });
	}
	const { id } = jwt.verify(token, process.env.JWT_SECRET);
	if (!id) {
		return res
			.status(400)
			.send({ auth: false, message: "Invalid credentials" });
	}
	const admin = await Admin.findById(id);
	if (!admin) {
		return res
			.status(400)
			.send({ auth: false, message: "Invalid credentials" });
	}
	// console.log("Admin authenticated");
	next();
};
