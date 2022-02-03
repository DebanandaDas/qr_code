// this module contains all controller functions that are used to manipulate db/students' collection.
const Student = require("../models/student");

module.exports.getStudent = async (req, res) => {
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) {
		return res.send(`Cannot find a student with the id${id}`).status(500);
	}
	res.send({ success: true, student });
};

module.exports.updateStudentTextparameters = async (req, res) => {
	const id = req.params.id;
	console.log(req.params.id);
	console.log(req.body);
	const student = await Student.findByIdAndUpdate(id, {
		...req.body.student,
	});
	await student.save();
	res.send({ success: true });
};

module.exports.createNewStudent = async (req, res) => {
	const student = new Student({
		...req.body.student,
	});
	await student.save();
	res.send({ success: true, id: student._id }).status(201);
};

module.exports.changeStudentPhoto = async (req, res) => {
	console.log(req.file);
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) {
		return res.send(`Cannot find a student with the id${id}`).status(500);
	}
	if (student.photo) {
		cloudinary.uploader.destroy(student.photo.filename, function (result) {
			console.log(result);
		});
	}
	student.photo = {
		url: req.file.path,
		filename: req.file.filename,
	};
	await student.save();
	res.send({ success: true });
};

module.exports.changeGradeCards = async (req, res) => {
	console.log(req.files);
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) {
		return res.send(`Cannot find a student with the id${id}`).status(500);
	}
	if (student.gradeCards) {
		student.gradeCards.forEach((element) => {
			cloudinary.uploader.destroy(element.filename, function (result) {
				console.log(result);
			});
		});
	}
	const gradeCards = req.files.map((imgObj) => {
		return { url: imgObj.path, filename: imgObj.filename };
	});
	student.gradeCards = gradeCards;
	await student.save();
	res.send({ success: true });
};

module.exports.deleteStudent = async (req, res) => {
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) {
		return res.send(`Cannot find a student with the id${id}`).status(500);
	}
	if (student.photo) {
		cloudinary.uploader.destroy(student.photo.filename, function (result) {
			console.log(result);
		});
	}
	if (student.gradeCards) {
		student.gradeCards.forEach((element) => {
			cloudinary.uploader.destroy(element.filename, function (result) {
				console.log(result);
			});
		});
	}
	await Student.findByIdAndDelete(id);
	res.send({ success: true });
};
