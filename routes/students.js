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
	getStudentByRegNo,
	verifyStudentByuuid,
	changeGradeCard,
	createNewStudentWithTextParams,
	createNewStudentFromQueryTextParams,
} = require("../controllers/students");
// admin middleware
const { isAdmin } = require("../middleware/admin");

// Joi schema validator middleware
const {
	studentValidator,
	studentValidatorTextParams,
	fileValidator,
} = require("../middleware/model_validator");
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
router.get("/verify/uuid", catchAsync(verifyStudentByuuid));

// isAdmin middleware is to make sure that changes to db are done by admins themselves

// READ functionality
router.get("/:id", catchAsync(getStudent));
router.get("/regNo/:regNo", catchAsync(getStudentByRegNo));

// UPDATE functionality
// router.put(
// 	"/updateText/:id",
// 	catchAsync(isAdmin),
// 	studentValidator,
// 	catchAsync(updateStudentTextparameters)
// );
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

router.post(
	"/createWithTextParams",
	catchAsync(isAdmin),
	upload.none(),
	catchAsync(usernameNotInDB),
	studentValidatorTextParams,
	catchAsync(createNewStudentWithTextParams)
);

router.post(
	"/createFromQueryTextParams",
	catchAsync(isAdmin),
	catchAsync(createNewStudentFromQueryTextParams)
);

router.put(
	"/putTextParams/:id",
	catchAsync(isAdmin),
	upload.none(),
	catchAsync(usernameNotInDB),
	studentValidatorTextParams,
	catchAsync(updateStudentTextparameters)
);

// PUT student photo (during creation & normal PUT)
router.put(
	"/putphoto",
	catchAsync(isAdmin),
	upload.single("photo"),
	fileValidator,
	catchAsync(idInDB),
	catchAsync(changeStudentPhoto)
);

// PUT Gradecards (during creation & normal PUT)
router.put(
	"/putgradecards/:id",
	catchAsync(isAdmin),
	upload.array("gradecards"),
	catchAsync(idInDB),
	catchAsync(changeGradeCards)
);

// PUT Gradecard (during creation & normal PUT)
router.put(
	"/putgradecard/:id/:semNo",
	catchAsync(isAdmin),
	upload.single("gradecard"),
	fileValidator,
	catchAsync(idInDB),
	catchAsync(changeGradeCard)
);

// DELETE functionality
router.delete(
	"/:id",
	catchAsync(isAdmin),
	catchAsync(idInDB),
	catchAsync(deleteStudent)
);

module.exports = router;
