//import express, JWT and the User model
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const User = require("../models/user.model.js");

//use middleware
app.use(express.json());

//function to authenticate the user and create a JWT for this login. It sends the ID of the user as the payload in the token
const auth = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userValid = await User.find({ email: email });
  if (!userValid) {
    res.status(403).json("Invalid Email");
  } else if (userValid[0].password !== password) {
    res.status(403).json("Invalid Password");
  } else {
    const payload = {
      id: userValid[0]._id,
    };
    const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
      algorithm: "HS256",
    });

    res.json(token);
  }
};

//export the function
module.exports = {
  auth,
};
