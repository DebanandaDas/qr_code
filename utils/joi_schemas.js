const Joi = require("joi");

const fileSchema = Joi.object({
	path: Joi.string().required(),
	filename: Joi.string().required(),
}).unknown(true);

const studentSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	name: Joi.string().required(),
	roll: Joi.string().required(),
	regNo: Joi.string().required(),
	department: Joi.string().required(),
	address: Joi.string().required(),
	photo: fileSchema,
	gradecards: Joi.array().items(fileSchema).max(8),
});

module.exports = { studentSchema, fileSchema };

// TESTING
// const object1 = {
// 	username: "username",
// 	password: "password",
// 	name: "Vineeth",
// 	roll: "1235",
// 	regNo: "1234jlk",
// 	department: "CSE",
// 	address: "IN",
// 	// photo: {
// 	// 	path: "path1",
// 	// 	filename: "file1",
// 	// 	random_attribute: "rand_val",
// 	// },
// };
// const { error } = studentSchema.validate(object1);
// if (error) {
// 	const msg = error.details.map((el) => el.message).join(",");
// 	console.log(msg);
// } else {
// 	console.log("Object validated");
// }
