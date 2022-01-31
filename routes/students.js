const express = require("express");
const router = express.Router({ mergeParams: true });
const Student = require("../models/student");

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) {
		return res.send(`Cannot find a student with the id${id}`).status(404);
	}
	res.send({ success: true, student });
});

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

module.exports = router;
