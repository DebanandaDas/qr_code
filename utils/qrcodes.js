const QRCode = require("qrcode");

module.exports.generateQR = async (text) => {
	try {
		const qrcode = await QRCode.toDataURL(text);
		// console.log(qrcode);

		return qrcode;
	} catch (err) {
		console.error(err);
	}
};
