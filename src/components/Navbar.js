import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "./reusable/AppBar"

const useStyles = makeStyles((theme) => ({
}));
export default function NavBar(props) {
  const dashboardData = [
    {
      icon: "home",
      button: "Home",
      url: "/",
      buttonFunction: "",
    },
    {
      icon: "play_circle_filled",
      button: "Demo",
      url: "/demo",
      buttonFunction: "",
    },
    {
      icon: "vpn_key",
      button: "Login",
      url: "/login",
      buttonFunction: "",
    },
    {
      icon: "create",
      button: "Sign Up",
      url: "/signup",
      buttonFunction: ""
    },
  ];
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar  dashboardData={dashboardData}></AppBar>
    </React.Fragment>
  );
}
