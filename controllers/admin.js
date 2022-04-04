const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();
const {mxFaceCompare}= require("../utils/mxFace");

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
	const { username, password, b64image } = req.body;
	const admin = await Admin.findOne({ username });
	if (!admin) {
		return res
			.status(400)
			.send({ success: false, message: "Invalid username" });
	}
	
	if (admin.password !== password) {
		return res.status(400).send({
			success: false,
			message: "Invalid password",
		});
	}
	console.log(admin);
	// const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
	// 	expiresIn: 3600,
	// });
	console.log(admin.photo);
	console.log(typeof(admin.photo));
	const fcCompRes= await mxFaceCompare(admin.photo,b64image);
	console.log(fcCompRes);
	if(fcCompRes.confidence >0.90)
	{
	const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
	// res.cookie("authcookie", token, {
	// 	maxAge: new Date(Date.now() + 60 * 60 * 1000),
	// 	signed: true,
	// 	httpOnly: true,
	// });
	res.cookie("authcookie", token, {
		httpOnly: true,
		sameSite: 'none', 
		secure: true,
	});
	res.status(200).send({ success: true });
}
else
{
	return res.status(400).send({
		success: false,
		message: "FNM",
	});
}
};

// logout is required since, we have to destroy the cookie which, destroys the token, that is good enough
// since he cant continue to do the same things as admin does without doing anything.
module.exports.logout = async (req, res) => {
	res.clearCookie("authcookie");
	res.status(200).send({ success: true });
};
