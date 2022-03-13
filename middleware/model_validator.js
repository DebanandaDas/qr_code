const Joi = require("joi");
const { studentSchema, fileSchema } = require("../utils/joi_schemas");
const ExpressError = require("../utils/ExpressError");

module.exports.studentValidator = (req, res, next) => {
	const { error } = studentSchema.validate(req.body.student);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		return res.status(400).send({ success: false, message: msg });
	}
	if (!req.files["photo"]) {
		return res
			.status(400)
			.send({ success: false, message: "Invalid media upload(photo)" });
	}
	if (req.files["photo"].length > 0) {
		const { error1 } = fileSchema.validate(req.files["photo"][0]);
		if (error1) {
			const msg = error1.details.map((el) => el.message).join(",");
			return res.status(400).send({ success: false, message: msg });
		}
	}
	/* if (!req.files["gradecards"]) {
		return res.status(400).send({
			success: false,
			message: "Invalid media upload(gradecards)",
		});
	} */
	/* if (req.files["gradecards"].length > 0) {
		const errorObj = req.files["gradecards"].forEach((imgObj) => {
			const { error2 } = fileSchema.validate(imgObj);
			if (error2) {
				const msg = error2.details.map((el) => el.message).join(",");
				return res.status(400).send({ success: false, message: msg });
			}
		});
	} */
	// console.log("Joi validator check passed");
	next();
};
