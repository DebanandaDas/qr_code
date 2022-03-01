// this module contains all controller functions that are used to manipulate db/students' collection.
const Student = require("../models/student");
// cloudinary functions
const { cloudinary, uploadImage, deleteImage } = require("../cloudinary");
// QRcode generator
const { generateQR } = require("../utils/qrcodes");

module.exports.getStudent = async (req, res) => {
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) {
		return res.status(400).send({
			success: false,
			message: `Cannot find a student with the id ${id}`,
		});
	}
	res.send({ success: true, student });
};
module.exports.getStudentByRegNo = async (req, res) => {
	const { regNo } = req.params;
	const student = await Student.findOne({ regNo });
	if (!student) {
		return res.status(400).send({
			success: false,
			message: `Cannot find a student with the id ${id}`,
		});
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

module.exports.updateStudent = async (req, res) => {
	const { id } = req.params;
	const student = await Student.findByIdAndUpdate(id, {
		...req.body.student,
	});

	if (req.files["photo"].length > 0) {
		if (student.photo) {
			// cloudinary.uploader.destroy(
			// 	student.photo.filename,
			// 	function (result) {
			// 		console.log(result);
			// 	}
			// );
			deleteImage(student.photo.filename);
		}
		student.photo = {
			url: req.files["photo"][0].path,
			filename: req.files["photo"][0].filename,
		};
	}

	if (req.files["gradecards"].length > 0) {
		if (student.gradeCards) {
			student.gradeCards.forEach((element) => {
				// cloudinary.uploader.destroy(
				// 	element.filename,
				// 	function (result) {
				// 		console.log(result);
				// 	}
				// );
				deleteImage(element.filename);
			});
		}
		const gradeCards = req.files.map((imgObj) => {
			return { url: imgObj.path, filename: imgObj.filename };
		});
		student.gradeCards = gradeCards;
	}
	// cloudinary.uploader.destroy(student.qrcode.filename, function (result) {
	// 	console.log(result);
	// });
	deleteImage(student.qrcode.filename);
	const qrcode_img = await generateQR(
		`http://localhost:3000/report?username=${student.username}&password=${student.password}`
	);
	const qrcode_obj = await uploadImage(qrcode_img, "Students/qrcodes");
	student.qrcode = { url: qrcode_obj.url, filename: qrcode_obj.public_id };

	await student.save();
	res.send({ success: true, id: student._id });
};

module.exports.createNewStudent = async (req, res) => {
	const student = new Student({
		...req.body.student,
	});
	// console.log(req.files);
	// Photo url collection
	student.photo = {
		url: req.files["photo"][0].path,
		filename: req.files["photo"][0].filename,
	};
	// Gradecard url collection
	const gradeCards = req.files["gradecards"].map((imgObj) => {
		return { url: imgObj.path, filename: imgObj.filename };
	});
	student.gradeCards = gradeCards;

	// QRcode image and url creation
	const qrcode_img = await generateQR(
		`http://localhost:3000/report?username=${student.username}&password=${student.password}`
	);
	const qrcode_obj = await uploadImage(qrcode_img, "Students/qrcodes");
	student.qrcode = { url: qrcode_obj.url, filename: qrcode_obj.public_id };

	await student.save();
	res.status(201).send({ success: true, id: student._id });
};

module.exports.changeStudentPhoto = async (req, res) => {
	console.log(req.file);
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) {
		return res.send(`Cannot find a student with the id${id}`).status(500);
	}
	if (student.photo) {
		// cloudinary.uploader.destroy(student.photo.filename, function (result) {
		// 	console.log(result);
		// });
		deleteImage(student.photo.filename);
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
			// cloudinary.uploader.destroy(element.filename, function (result) {
			// 	console.log(result);
			// });
			deleteImage(element.filename);
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
	if (student.photo.filename) {
		console.log(student.photo);
		// cloudinary.uploader.destroy(student.photo.filename, function (result) {
		// 	console.log(result);
		// });
		deleteImage(student.photo.filename);
	}
	if (student.qrcode.filename) {
		console.log(student.qrcode);
		// cloudinary.uploader.destroy(student.qrcode.filename, function (result) {
		// 	console.log(result);
		// });
		deleteImage(student.qrcode.filename);
	}
	if (student.gradeCards.length > 0) {
		student.gradeCards.forEach((element) => {
			// cloudinary.uploader.destroy(element.filename, function (result) {
			// 	console.log(result);
			// });
			deleteImage(element.filename);
		});
	}
	await Student.findByIdAndDelete(id);
	res.send({ success: true });
};

module.exports.verifyStudent = async (req, res) => {
	const { username, password } = req.query;
	console.log(req.query);
	// const { username, password } = req.body;
	const student = await Student.findOne({ username });
	console.log(student);
	if (!student) {
		return res.status(500).send({
			success: false,
			message: "Invalid username",
		});
	} else if (student.password !== password) {
		return res.status(500).send({
			success: false,
			message: "Invalid password",
		});
	}

	res.status(200).send({
		success: true,
		id: student._id,
		message: "Student verified",
	});
};

module.exports.verifyStudentRegNo = async (req, res) => {
	const { regNo, password } = req.query;
	console.log(req.query);
	// const { username, password } = req.body;
	const student = await Student.findOne({ regNo });
	console.log(student);
	if (!student) {
		return res.status(500).send({
			success: false,
			message: "Invalid username",
		});
	} else if (student.password !== password) {
		return res.status(500).send({
			success: false,
			message: "Invalid password",
		});
	}

	res.status(200).send({
		success: true,
		id: student._id,
		message: "Student verified",
	});
};
