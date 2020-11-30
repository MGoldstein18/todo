//import react, axios and css
import axios from "axios";
import React from "react";
import "../App.css";

//create class component to hold the login form with state to hold each input field
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  //function to ensure that state is ultimate source for login form
  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //function to handle login, create token and save it to local storage and move user to the page on which they can view their to do list
  async submit(e) {
    e.preventDefault();

    const newLogin = {
      email: this.state.email,
      password: this.state.password,
    };

    await axios
      .post("http://localhost:5000/login", newLogin)
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location = "/user";
      })
      .catch(() => alert("Invalid Login details!"));
  }

  //display UI
  render() {
    return (
      <section id="login">
        <form className="form" onSubmit={this.submit}>
          <h5 className="text-center">Complete your details to Login!</h5>
          <hr />
          <div className="form-group">
            <label>Email</label>
            <input
              autocomplete="off"
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.change}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              autocomplete="off"
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.change}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-info" type="submit">
              Login!
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default Login;
