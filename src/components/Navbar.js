import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "./reusable/AppBar"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PublicIcon from "@material-ui/icons/Public";
import HomeIcon from "@material-ui/icons/Home";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlink: {
    // backgroundColor: "#21b6ae",
    // '&:hover': {
    //     backgroundColor:"#1D938C",
    // }
  },
}));
export default function NavBar(props) {
  const icon = ["home", "play_circle_filled", "vpn_key", "create"]
  const button = ["Home", "Demo", "Login", "Sign Up"]
  const url = ["/", "/demo", "/login", "/signup"]
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar icon={icon} button={button} url={url}></AppBar>
    </React.Fragment>
  );
}
