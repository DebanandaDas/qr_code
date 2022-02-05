const express = require("express");
const router = express.Router({ mergeParams: true });
const { login, register } = require("../controllers/admin");
// This module contains the router for all urls starting with /admin with controller functions directly implemented.
// /register
router.post("/register", register);
// /login
router.post("/login", login);
// /logout
module.exports = router;
