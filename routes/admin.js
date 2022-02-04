const express = require("express");
const router = express.Router({ mergeParams: true });
const { login } = require("../controllers/admin");
// This module contains the router for all urls starting with /admin with controller functions directly implemented.
// /login
router.post("/login", login);
// /logout
router.module.exports = router;
