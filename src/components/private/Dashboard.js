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
  const icon = ["push_pin", "account_circle", "addchart", "exit_to_app"];
  const button = ["My Pins", "My Map", "Summary", "Sign Out"];
  const url = ["/user/pins", "/user", "/user/summary", "/"];
  const buttonFunction = [logout];
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar
        icon={icon}
        button={button}
        url={url}
        buttonFunction={buttonFunction}
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
