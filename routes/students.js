const express = require("express");
const router = express.Router({ mergeParams: true });
const Student = require("../models/student");

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
router.post("/", async (req, res) => {
	const student = new Student({
		...req.body.student,
	});
	await student.save();
	res.send({ success: true, id: student._id }).status(201);
});

// DELETE functionality
router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) {
		return res.send(`Cannot find a student with the id${id}`).status(500);
	}
	await Student.findByIdAndDelete(id);
	res.send({ success: true });
});

module.exports = router;
