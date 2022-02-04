const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();

module.exports.isAdmin = (req, res, next) => {
	// const authHeader = req.headers["authorization"];
	// const token = authHeader && authHeader.split(' ')[1]
	const token = req.body.token;

	if (token == null) return res.sendStatus(401);

	const id = jwt.verify(token, process.env.JWT_SECRET);
	if (!id) {
		return res
			.status(500)
			.send({ auth: false, message: "Invalid credentials" });
	}

	const admin = await Admin.findById(id);
	if (!admin) {
		return res
			.status(500)
			.send({ auth: false, message: "Invalid credentials" });
	}
	next();
};

module.exports.register = async (req, res) => {
	const { username, password } = req.body;
	const admin = await Admin.find({ username });
	if (admin) {
		return res.status(500).send({
			success: false,
			message: "an admin with the same password already exisits",
		});
	}

	const admin1 = new Admin({ username, password });
	await admin.save();
	const token = jwt.sign({ id: admin1._id }, process.env.JWT_SECRET, {
		expiresIn: 3600,
	});
	res.status(201).send({ success: true, token });
};

module.exports.login = async (req, res) => {
	const { username, password } = req.body;
	const admin = await Admin.find({ username });
	if (!admin) {
		return res
			.status(500)
			.send({ success: false, message: "Invalid username" });
	}
	if (admin.password !== password) {
		return res
			.status(500)
			.send({ success: false, message: "Invalid password" });
	}
	const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
		expiresIn: 3600,
	});
	res.status(200).send({ success: true, token });
};

// logout is not required since, if at the client side, when logout is clicked, destroys the token, that is good enough
// since he cant continue to do the same things as admin does without doing anything.
// module.exports.logout = async (req, res) => {

// }
