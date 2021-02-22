import React from "react";
import AppBar from "./reusable/AppBar"

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
  return (
    <React.Fragment>
      <AppBar  dashboardData={dashboardData}></AppBar>
    </React.Fragment>
  );
}
