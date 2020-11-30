//import react, css, axios and link
import React from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

/*create class component called List which as state to hold user input for a new to do, 
an object to hold the user details and an array to hold the user's list of todos*/
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new: "",
      user: {},
      todo: [],
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.delete = this.delete.bind(this);
  }

  //when the component mounts get the user's information using the token and save the data to state
  async componentDidMount() {
    const token = await JSON.parse(localStorage.getItem("token"));
    axios
      .get("http://localhost:5000/user/todo", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) =>
        this.setState({ user: response.data, todo: response.data.todo })
      )
      .catch((err) => console.log(err));
  }

  //function to ensure that state is ultimate source for form creating a new to do
  change(e) {
    this.setState({
      new: e.target.value,
    });
  }

  //submit function for adding a new todo. using token from local storage, and then saving the user's updated information to state
  async submit(e) {
    e.preventDefault();

    const newTodo = {
      item: this.state.new,
      user: this.state.user._id,
    };

    const token = await JSON.parse(localStorage.getItem("token"));
    await axios
      .post("http://localhost:5000/todo/add", newTodo, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        axios
          .get("http://localhost:5000/user/todo", {
            headers: {
              Authorization: token,
            },
          })
          .then((response) =>
            this.setState({ user: response.data, todo: response.data.todo })
          )
          .catch((err) => console.log(err));
        this.setState({ new: "" });
      })

      .catch((err) => console.log(err));

    console.log(this.state.user);
    console.log(this.state.todo);
  }

  //delete function to remove a task from the user's list in the both the database and the array in state
  async delete(e) {
    e.preventDefault();

    const newDelete = {
      id: e.target.name,
    };

    const token = await JSON.parse(localStorage.getItem("token"));

    axios
      .post("http://localhost:5000/todo/delete", newDelete, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        const newArray = this.state.todo.filter(
          (item) => item._id !== e.target.name
        );

        this.setState({
          todo: newArray,
        });
      })
      .catch((err) => console.log(err));
  }

  //display the UI
  render() {
    return (
      <div>
        <h1 className="text-center m-5 welcome">
          Welcome, {this.state.user.firstName}
        </h1>
        <div className="d-flex justify-content-around">
          <div
            id="list"
            className="justify-self-center shadow p-3 mb-5 bg-white rounded card"
          >
            <div className="card-body">
              <h3 className="card-title text-center">My To Do List</h3>
              <hr />
              <ul className="list-group list-group-flush">
                {this.state.todo.map((todo) => {
                  return (
                    <li className="d-flex" key={todo._id}>
                      <div className="item">{todo.item} </div>
                      <div className="deleteButton">
                        <button
                          type="button"
                          name={todo._id}
                          onClick={this.delete}
                          className="btn-sm btn-warning"
                        >
                          Delete Task
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="shadow p-3 mb-5 bg-white rounded card">
            <h4 className="card-title">Add New To Do</h4>
            <hr />
            <form onSubmit={this.submit}>
              <input
                className="form-control"
                type="text"
                value={this.state.new}
                onChange={this.change}
              />
              <br />
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
        <button className="btn btn-danger m-5 logout">
          <Link to="/">Logout</Link>
        </button>
      </div>
    );
  }
}

export default List;
