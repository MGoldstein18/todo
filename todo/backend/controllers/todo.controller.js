//import Todo and User models and JWT
const Todo = require("../models/todo.model.js");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

//function to create a new todo using the token to authenticate and find the user who is adding a new todo
const createTodo = (req, res) => {
  //variable to hold the task entered by the user
  const item = req.body.item;

  //variable for token
  const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(token, "jwt-secret");

    const filter = { _id: decoded.id };

    const newTodo = new Todo({
      item,
      user: decoded.id,
    });

    //create and save the to do before pushing it to the user's array of tasks
    newTodo
      .save()
      .then((response) => {
        const update = { $push: { todo: response._id } };

        User.findOneAndUpdate(filter, update).then((response) =>
          res.json(response)
        );
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res.status(401).json("Error: You need to be logged in to add a new to do!");
  }
};

//function to delete a todo 
const deleteTodo = (req, res) => {
  //get id of item to be deleted from frontend
  const id = req.body.id;
  //variable to hold token
  const token = req.headers["authorization"];

  try {
    const decoded = jwt.verify(token, "jwt-secret");

    const filter = { _id: id };
    //find by id of task and delete
    Todo.findOneAndDelete(filter)
      .then(() => res.json("Task Deleted!"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res.status(401).json("Error: You need to be logged in to delete a task!");
  }
};

//export functions
module.exports = {
  createTodo,
  deleteTodo,
};
