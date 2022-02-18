const express = require("express");
const router = express.Router({ mergeParams: true });
const { login, register, logout } = require("../controllers/admin");

// Error handling middleware
const catchAsync = require("../utils/catchAsync");
// This module contains the router for all urls starting with /admin with controller functions directly implemented.
// /register
router.post("/register", catchAsync(register));
// /login
router.post("/login", catchAsync(login));
// /logout
router.get("/logout", catchAsync(logout));
module.exports = router;
