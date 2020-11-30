//import express, cors and mongoose
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//configure env
require("dotenv").config();

//declare app and the port
const app = express();
const PORT = process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());

//get routes and use each
const userRoutes = require("./routes/user.routes.js");
const todoRoutes = require("./routes/todo.routes.js");
const authRoutes = require("./routes/auth.routes.js");

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);
app.use("/login", authRoutes);

//declare uri in environment variable and use it connect to the database
const uri = process.env.uri;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Connected to Database!"));

//start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
