const mongoose = require("mongoose");
const { Schema } = mongoose;
const ImageSchema = new Schema({
	url: String,
	filename: String,
});
const StudentSchema = new Schema({
	name: String,
	roll: String,
	regNo: String,
	department: String,
	// photo: ImageSchema,
	// gradeCards: [ImageSchema],
});

module.exports = mongoose.model("Student", StudentSchema);
