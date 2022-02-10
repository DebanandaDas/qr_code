const express = require("express");
const router = express.Router({ mergeParams: true });

// This module contains the router for all urls starting with /student.
// The following three statements are required to store images in cloudinary and get their respective
// links to store in db / delete in cloudinary.
const { cloudinary, imageStorage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage: imageStorage });
const {
	getStudent,
	updateStudentTextparameters,
	createNewStudent,
	changeStudentPhoto,
	changeGradeCards,
	deleteStudent,
	verifyStudent,
} = require("../controllers/students");
const { isAdmin } = require("../controllers/admin");

// VERIFY (GET /students/verify?username&password)
router.get("/verify", verifyStudent);

// isAdmin middleware is to make sure that changes to db are done by admins themselves

// READ functionality
router.get("/:id", getStudent);

// UPDATE functionality
router.put("/:id", isAdmin, updateStudentTextparameters);

// CREATE functionality
router.post(
	"/",
	isAdmin,
	upload.fields([{ name: "photo" }, { name: "gradecards", maxCount: 8 }]),
	createNewStudent
);

// PUT student photo (during creation & normal PUT)
router.put(
	"/putphoto/:id",
	isAdmin,
	upload.single("photo"),
	changeStudentPhoto
);

// PUT Gradecards (during creation & normal PUT)
router.put(
	"/putgradecards/:id",
	isAdmin,
	upload.array("gradecards"),
	changeGradeCards
);

// DELETE functionality
router.delete("/:id", isAdmin, deleteStudent);

module.exports = router;
