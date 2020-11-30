//Model to hold the user schema which has a one to many relationship with the todo model. Ie: one user can have many todos
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: [true, "Please add your first name"] },
    lastName: { type: String, required: [true, "Please add your last name"] },
    email: { type: String, required: [true, "Please add your email"] },
    password: {type: String, required: [true, "Please add a password of at least 8 characters"], min : 8},
    todo: [{ type: Schema.Types.ObjectId, ref: "todo" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
