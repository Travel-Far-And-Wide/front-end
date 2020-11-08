import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../reusable/AppBar";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/actions";
import Map from "./map/Map";

const useStyles = makeStyles((theme) => ({
  navlink: {
    borderRadius: 5, 
    backgroundColor: "#21b6ae",
    padding: "5px 10px",
  },
  dashboardNav: { backgroundColor: "#21b6ae" },
}));

function Dashboard(props) {
  const logout = () => {
    props.logoutUser();
    window.localStorage.removeItem("token");
  };
  const dashboardData = [
    {
      icon: "push_pin",
      button: "My Pins",
      url: "/user/pins",
      buttonFunction: "",
    },
    {
      icon: "account_circle",
      button: "My Map",
      url: "/user",
      buttonFunction: "",
    },
    {
      icon: "addchart",
      button: "Summary",
      url: "/user/summary",
      buttonFunction: "",
    },
    {
      icon:"exit_to_app",
      button: "Sign Out",
      url: "/",
      buttonFunction: logout,
    }
  ];
  const buttonFunction = [logout];
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar
dashboardData={dashboardData}
      />
      <Map />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    errors: state.errors,
    loggedInUser: state.loggedInUser,
  };
};
export default connect(mapStateToProps, { logoutUser })(Dashboard);
