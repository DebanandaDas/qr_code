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

const uploadImage = async (imageInURI, folder) => {
	return await cloudinary.uploader.upload(imageInURI, { folder });
};

const deleteImage = async (filename) => {
	return await cloudinary.uploader.destroy(filename);
};

// Not working
const deleteFolder = async () => {
	cloudinary.delete_all_resources("Students/", function (error, result) {
		console.log(result, error);
		console.log("All files deleted");
	});
};

module.exports = {
	cloudinary,
	imageStorage,
	uploadImage,
	deleteFolder,
	deleteImage,
};
