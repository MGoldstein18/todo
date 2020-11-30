//import react, app and relevant components
import React from "react";
import "../App.css";
import Signup from "./Signup.js";
import Login from "./Login.js";

//create class component called Home which has a state to track if the user wants to sign up or register
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: "",
    };
    this.form = this.form.bind(this);
  }

  //function to monitor the register/sign in choice of the user
  form(e) {
    e.preventDefault();

    this.setState({
      form: e.target.name,
    });
  }

  render() {
    return (
      <div className="container">
        <header className="text-center">
          <h1>ToDo App</h1>
          <h4>Create, update and manage your list of tasks!</h4>
        </header>
        <hr />
        <main>
          <section className="d-flex justify-content-center">
            <button onClick={this.form} name="login" className="login">
              Login
            </button>
            <button onClick={this.form} name="sign" className="sign">
              Sign up
            </button>
          </section>
          <section>
            {this.state.form === "sign" ? (
              <Signup />
            ) : this.state.form === "login" ? (
              <Login />
            ) : null}
          </section>
          <section className="how text-center">
            <h3 id="heading">How Does it Work?</h3>
            <div className="d-flex-column">
              <div className="step d-flex">
                <div className="one">1.</div>
                <div className="one-w">Sign up or Login</div>
              </div>
              <div className="step d-flex">
                <div className="two">2.</div>
                <div className="two-w">Create a new task</div>
              </div>
              <div className="step d-flex">
                <div className="three">3.</div>
                <div className="three-w">
                  Complete tasks and manage your lists
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="text-center p-5">
          <h3>ToDo App &copy; 2020</h3>
        </footer>
      </div>
    );
  }
}

export default Home;
