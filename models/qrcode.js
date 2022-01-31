const mongoose = require("mongoose");
const { Schema } = mongoose;

const QrCodeSchema = new Schema({});

module.exports = mongoose.model("Student", StudentSchema);
