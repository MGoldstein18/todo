//routes for authentication
const express = require("express");
const router = express.Router();
const { auth } = require("../controllers/auth.controller.js");

router.post("/", auth);

module.exports = router;
