// This module contains all middleware that access students resource
// Auth, usernameCheck, idCheck

const Student = require("../models/student");

module.exports.usernameNotInDB = async (req, res, next) => {
	const { username } = req.body.student;
	const student = Student.find({ username });

	if (student.length > 0) {
		return res.status(400).send({
			success: false,
			message: "Student with given username already exists.",
		});
	}
	next();
};

module.exports.usernameInDB = async (req, res, next) => {
	console.log(req.body.student);

	const { username } = req.body.student;
	const student = await Student.findOne({ username });

	if (!student) {
		return res.status(400).send({
			success: false,
			message: "Student with given username does not exist.",
		});
	}
	next();
};

module.exports.idInDB = async (req, res, next) => {
	const { id } = req.params;
	const student = await Student.findById(id);
	if (!student) {
		return res.status(400).send({
			success: false,
			message: "Student with given id does not exist.",
		});
	}
	console.log("ID in DB");
	next();
};
