import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrivateAppBar from "../reusable/PrivateAppBar";
import CalculateDistance from "../reusable/CalculateDistance";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  navlink: {
    borderRadius: 5,
    backgroundColor: "#21b6ae",
    padding: "5px 10px",
  },
  dashboardNav: { backgroundColor: "#21b6ae" },
}));

function Summary(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <PrivateAppBar />
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
export default connect(mapStateToProps, {})(Summary);
