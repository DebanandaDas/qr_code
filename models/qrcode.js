const mongoose = require("mongoose");
const { Schema } = mongoose;
const Student = require("./student");

const QrCodeSchema = new Schema(
	{},
	{
		timestamps: true,
		strict: true,
	}
);

module.exports = mongoose.model("QRCode", QrCodeSchema);
