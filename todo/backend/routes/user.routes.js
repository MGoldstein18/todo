//routes for users
const express = require("express");
const router = express.Router();
const { createUser, getTodo } = require("../controllers/user.controller.js");

router.post("/add", createUser);
router.get("/todo", getTodo);

module.exports = router;
