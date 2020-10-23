import React from "react";
import "./App.scss";
import Nav from "./components/Navbar";
import Home from "./components/routes/Home";
import Demo from "./components/routes/Demo";
import Login from "./components/routes/Login";
import SignUp from "./components/routes/SignUp";
import Dashboard from "./components/private/Dashboard";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { connect } from "react-redux";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          {props.isLoggedIn ? "" : <Nav />}
          <Route exact path="/" component={Home} />
          <Route exact path="/demo" component={Demo} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Switch>
            <PrivateRoute exact path="/user" component={Dashboard} />
          </Switch>{" "}
        </Router>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    isLoggedIn: state.isLoggedIn,
  };
};
export default connect(mapStateToProps, {})(App);
