const express = require("express");
const router = express.Router({ mergeParams: true });
const Student = require("../models/student");
// The following three statements are required to store images in cloudinary and get their respective links to store in db.
const { cloudinary, storage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage });
// This module contains controller functions implemented directly inside the router.
// READ functionality
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) {
		return res.send(`Cannot find a student with the id${id}`).status(500);
	}
	res.send({ success: true, student });
});

// UPDATE functionality
router.put("/:id", async (req, res) => {
	const id = req.params.id;
	console.log(req.params.id);
	console.log(req.body);
	const student = await Student.findByIdAndUpdate(id, {
		...req.body.student,
	});
	await student.save();
	res.send({ success: true });
});

// CREATE functionality
router.post("/", upload.none(), async (req, res) => {
	const student = new Student({
		...req.body.student,
	});
	await student.save();
	res.send({ success: true, id: student._id }).status(201);
});

// PUT student photo (during creation & normal PUT)
router.put("/putphoto/:id", upload.single("photo"), async (req, res) => {
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
});

// PUT Gradecards (during creation & normal PUT)
router.put(
	"/putgradecards/:id",
	upload.array("gradecards"),
	async (req, res) => {
		console.log(req.files);
		const id = req.params.id;
		const student = await Student.findById(id);
		if (!student) {
			return res
				.send(`Cannot find a student with the id${id}`)
				.status(500);
		}
		if (student.gradeCards) {
			student.gradeCards.forEach((element) => {
				cloudinary.uploader.destroy(
					element.filename,
					function (result) {
						console.log(result);
					}
				);
			});
		}
		const gradeCards = req.files.map((imgObj) => {
			return { url: imgObj.path, filename: imgObj.filename };
		});
		student.gradeCards = gradeCards;
		await student.save();
		res.send({ success: true });
	}
);

// DELETE functionality
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
