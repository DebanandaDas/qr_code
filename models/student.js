const mongoose = require("mongoose");
const { Schema } = mongoose;
const ImageSchema = new Schema(
	{
		url: String,
		filename: String,
	},
	{
		timestamps: true,
	}
);
const StudentSchema = new Schema(
	{
		name: String,
		roll: String,
		regNo: String,
		department: String,
		address: String,
		photo: ImageSchema,
		// gradeCards: [ImageSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Student", StudentSchema);
