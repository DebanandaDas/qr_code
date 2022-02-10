const mongoose = require("mongoose");
const { Schema } = mongoose;
const FileSchema = new Schema(
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
		photo: FileSchema,
		gradeCards: [FileSchema],
		qrcode: FileSchema,
	},
	{
		timestamps: true,
		strict: true,
	}
);

module.exports = mongoose.model("Student", StudentSchema);
