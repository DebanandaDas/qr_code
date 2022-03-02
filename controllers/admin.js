const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();

module.exports.register = async (req, res) => {
	const { username, password } = req.body;
	const admin = await Admin.find({ username });
	console.log(admin);
	if (admin.username) {
		return res.status(500).send({
			success: false,
			message: "an admin with the same username already exisits",
		});
	}

	const admin1 = new Admin({ username, password });
	await admin1.save();
	// this functionality is not required in /register.
	// const token = jwt.sign({ id: admin1._id }, process.env.JWT_SECRET, {
	// 	expiresIn: 3600,
	// });
	// res.cookie("authcookie", token, {
	// 	maxAge: new Date(Date.now() + 60 * 60 * 1000),
	// });
	res.status(201).send({ success: true });
};

module.exports.login = async (req, res) => {
	const { username, password } = req.body;
	const adminArray = await Admin.find({ username });
	if (adminArray.length === 0) {
		return res
			.status(400)
			.send({ success: false, message: "Invalid username" });
	}
	const admin = adminArray[0];
	if (admin.password !== password) {
		return res.status(400).send({
			success: false,
			message: "Invalid password",
		});
	}
	// const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
	// 	expiresIn: 3600,
	// });
	const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
	// res.cookie("authcookie", token, {
	// 	maxAge: new Date(Date.now() + 60 * 60 * 1000),
	// 	signed: true,
	// 	httpOnly: true,
	// });
	res.cookie("authcookie", token, {
		httpOnly: true,
	});
	res.status(200).send({ success: true });
};

// logout is required since, we have to destroy the cookie which, destroys the token, that is good enough
// since he cant continue to do the same things as admin does without doing anything.
module.exports.logout = async (req, res) => {
	res.clearCookie("authcookie");
	res.status(200).send({ success: true });
};
