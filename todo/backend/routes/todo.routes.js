//routes for to dos
const express = require("express");
const router = express.Router();
const { createTodo, deleteTodo } = require("../controllers/todo.controller.js");

router.post("/add", createTodo);
router.post("/delete", deleteTodo);

module.exports = router;
