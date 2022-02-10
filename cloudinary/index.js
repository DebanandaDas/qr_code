const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const imageStorage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "Students",
		allowedFormats: ["jpeg", "png", "jpg"],
	},
});

// const qrStorage = new CloudinaryStorage({
// 	cloudinary,
// 	params: {
// 		folder: "QrCodes",
// 		allowedFormats: ["jpeg", "png", "jpg"],
// 	},
// });
// module.exports = { cloudinary, imageStorage, qrStorage };

module.exports = { cloudinary, imageStorage };
