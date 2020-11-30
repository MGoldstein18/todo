//Model to hold the todo schema which has a many to one relationship with the user model. Ie: one user can have many todos
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    item: { type: String },
    completed: { type: Boolean, default: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
