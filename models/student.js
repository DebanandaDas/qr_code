const mongoose = require("mongoose");
const { Schema } = mongoose;
const ImageSchema = new Schema(
	{
		url: String,
		filename: String,
	},
	{
		timestamps: true,
		strict: true,
	}
);
const StudentSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: String,
		roll: String,
		regNo: String,
		department: String,
		address: String,
		photo: ImageSchema,
		gradeCards: [ImageSchema],
	},
	{
		timestamps: true,
		strict: true,
	}
);

module.exports = mongoose.model("Student", StudentSchema);
