const express = require("express");
const router = express.Router({ mergeParams: true });

// This module contains the router for all urls starting with /student.
// The following three statements are required to store images in cloudinary and get their respective
// links to store in db / delete in cloudinary.
const { cloudinary, imageStorage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage: imageStorage });
// student controllers
const {
	getStudent,
	updateStudent,
	updateStudentTextparameters,
	createNewStudent,
	changeStudentPhoto,
	changeGradeCards,
	deleteStudent,
	verifyStudent,
	verifyStudentRegNo,
} = require("../controllers/students");
// admin middleware
const { isAdmin } = require("../middleware/admin");

// Joi schema validator middleware
const { studentValidator } = require("../middleware/model_validator");
// catchAsync error handling middleware
const catchAsync = require("../utils/catchAsync");
// username/id check middlewares
const {
	usernameInDB,
	usernameNotInDB,
	idInDB,
} = require("../middleware/students");

// VERIFY (GET /students/verify?username&password)
router.get("/verify", catchAsync(verifyStudent));
router.get("/verify/regNo", catchAsync(verifyStudentRegNo));

// isAdmin middleware is to make sure that changes to db are done by admins themselves

// READ functionality
router.get("/:id", catchAsync(getStudent));

// UPDATE functionality
router.put(
	"/updateText/:id",
	catchAsync(isAdmin),
	studentValidator,
	catchAsync(updateStudentTextparameters)
);
router.put(
	"/:id",
	catchAsync(isAdmin),
	upload.fields([{ name: "photo" }, { name: "gradecards", maxCount: 8 }]),
	catchAsync(idInDB),
	studentValidator,
	catchAsync(updateStudent)
);
// CREATE functionality
router.post(
	"/",
	catchAsync(isAdmin),
	upload.fields([{ name: "photo" }, { name: "gradecards", maxCount: 8 }]),
	catchAsync(usernameNotInDB),
	studentValidator,
	catchAsync(createNewStudent)
);

// PUT student photo (during creation & normal PUT)
router.put(
	"/putphoto/:id",
	catchAsync(isAdmin),
	upload.single("photo"),
	catchAsync(changeStudentPhoto)
);

// PUT Gradecards (during creation & normal PUT)
router.put(
	"/putgradecards/:id",
	catchAsync(isAdmin),
	upload.array("gradecards"),
	catchAsync(changeGradeCards)
);

// DELETE functionality
router.delete(
	"/:id",
	catchAsync(isAdmin),
	catchAsync(idInDB),
	catchAsync(deleteStudent)
);

module.exports = router;
