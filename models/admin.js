const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		strict: true,
	}
);

module.exports = mongoose.model("Admin", AdminSchema);
