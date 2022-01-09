const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Connected!");
});
mongoose.set("debug", true);

app.listen(port, (err) => {
	if (err) console.log(err);
	else {
		console.log(`listening at ${port}`);
	}
});
