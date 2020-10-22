import React from "react";
import "./App.scss";
import Nav from "./components/Navbar";
import Home from "./components/routes/Home";
import Demo from "./components/routes/Demo";
import Login from "./components/routes/Login";
import SignUp from "./components/routes/SignUp";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route exact path="/demo" component={Demo} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Router>
      </header>
    </div>
  );
}

export default App;
