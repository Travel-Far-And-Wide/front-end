import React, { useEffect, useState } from "react";
import "./App.scss";
import Nav from "./components/Navbar";
import PrivateAppBar from "././components/reusable/PrivateAppBar";
import Home from "./components/routes/Home";
import Demo from "./components/routes/Demo";
import Login from "./components/routes/Login";
import SignUp from "./components/routes/SignUp";
import Dashboard from "./components/private/Dashboard";
import Summary from "./components/private/Summary";
import MyPins from "./components/private/MyPins";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { connect } from "react-redux";

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    window.localStorage.getItem("user_id")
      ? setLoggedIn(true)
      : setLoggedIn(false);
  }, [props.isLoggedIn]);
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <header className="App-header">
        <Router>
          {loggedIn ? <PrivateAppBar /> : <Nav />}
          <Route exact path="/" component={Home} />
          <Route exact path="/demo" component={Demo} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Switch>
            <PrivateRoute exact path="/user" component={Dashboard} />
            <PrivateRoute exact path="/user/summary" component={Summary} />
            <PrivateRoute exact path="/user/pins" component={MyPins} />
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
