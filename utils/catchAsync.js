// This module is a error handling wrapper that logs the error message in the console.
// Wrapper makes sure server does not crash when encounters a 500

module.exports = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch((err) => {
			console.log(err);
			return res.status(500).send(err);
		});
	};
};
