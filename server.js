const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const corsOptions = {
	origin: "*",
	mehtods: ["GET", "PUT", "POST", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const studentRoutes = require("./routes/students");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
mongoose.connect(process.env.DB_ADMIN_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Connected!");
});
mongoose.set("debug", true);

app.get("/", (req, res) => {
	res.send("hello, world");
});
app.use("/students", studentRoutes);
app.use("/admin", adminRoutes);
app.listen(port, (err) => {
	if (err) console.log(err);
	else {
		console.log(`listening at ${port}`);
	}
});
