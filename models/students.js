const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
	name: String,
	roll: String,
	regNo: String,
	department: String,
});

module.exports = mongoose.model("Student", StudentSchema);
