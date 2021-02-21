import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/actions";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  navlink: {},
}));

function PrivateAppBar(props) {
  const classes = useStyles();
  const logout = () => {
    props.logoutUser();
    window.localStorage.removeItem("token");
  };
  const buttonFunction = [logout];
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
      icon: "exit_to_app",
      button: "Sign Out",
      url: "/",
      buttonFunction: logout,
    },
  ];
  return (
    <React.Fragment>
      <Box
        style={{ backgroundColor: "#21b6ae" }}
        height={60}
        width="100%"
        className="fade"
        container
        direction="row"
        justify="space-between"
      >
        <Grid
          style={{ backgroundColor: "#21b6ae" }}
          container
          justify="flex-end"
          height="100%"
        >
          {dashboardData
            ? dashboardData.map((e) => (
                <Box>
                  <Link style={{ textDecoration: "none" }} to={`${e.url}`}>
                    {" "}
                    <Button
                      onClick={e.buttonFunction}
                      style={{ height: 60 }}
                      className={classes.navlink}
                    >
                      {" "}
                      <Icon>{e.icon}</Icon>
                      <Typography variant="h6">{e.button}</Typography>
                    </Button>
                  </Link>
                </Box>
              ))
            : ""}
        </Grid>
      </Box>
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
export default connect(mapStateToProps, { logoutUser })(PrivateAppBar);
