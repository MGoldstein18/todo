//import react, css and axios
import React from "react";
import "../App.css";
import axios from "axios";

//create class sing up to handle the signup of a new user. State to hold input from form.
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  //function to keep state as the ultimate source for form input
  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  //when form is submitted create a new user
  submit(e) {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/user/add", newUser)
      .then(() =>
        alert(
          "Thank you for registering! You will now be directed to the home scree. Please login to access your account."
        )
      )
      .catch((err) => alert(err));

    window.location = "/";
  }

  //display UI
  render() {
    return (
      <section id="signup">
        <form className="form" onSubmit={this.submit}>
          <h5 className="text-center">Complete your details to Sign Up!</h5>
          <hr />
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={this.state.firstName}
              onChange={this.change}
              required
              autocomplete="off"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={this.state.lastName}
              onChange={this.change}
              required
              autocomplete="off"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.change}
              required
              autocomplete="off"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.change}
              required
              autocomplete="off"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-info" type="submit">
              Sign up!
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default Signup;
