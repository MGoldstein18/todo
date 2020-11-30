//import User model, JWT and express
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

//express middleware
app.use(express.json());

//create a new user
const createUser = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const email = req.body.email;

  const newUser = new User({
    firstName,
    lastName,
    password,
    email,
  });

  newUser
    .save()
    .then(() => res.json("User Add!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

//get the todo list of a user
const getTodo = (req, res) => {
  const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(token, "jwt-secret");
    User.find({ _id: decoded.id })
      .populate("todo")
      .then((response) => res.json(response[0]))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res
      .status(401)
      .json("Error: You need to be logged in to view your to do list");
  }
};

module.exports = {
  createUser,
  getTodo,
};
