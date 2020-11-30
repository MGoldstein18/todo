import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/List.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home.js";

function App() {
  return (
    <div className="app">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/user" component={List} />
      </Router>
    </div>
  );
}

export default App;
