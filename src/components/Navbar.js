import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    borderRadius: 5,
    padding: "5px 10px",
    // backgroundColor: "#21b6ae",
    // '&:hover': {
    //     backgroundColor:"#1D938C",
      
    // }
  },
}));
export default function NavBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
      >
        <Box>
          <Button  className={classes.navlink}>
            <PublicIcon />
            <Typography>Travel Far & Wide</Typography>
          </Button>
        </Box>
        <Grid  style={{ width: 400, backgroundColor: "#21b6ae", borderRadius: 5}}container justify="space-between" >
        <Box>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            {" "}
            <Button className={classes.navlink}>
              {" "}
              <HomeIcon />
              <Typography>Home</Typography>
            </Button>
          </Link>
        </Box>
        <Box>
          <Link style={{ textDecoration: "none" }} to={"/demo"}>
          {" "}
          <Button  className={classes.navlink}>
            {" "}
            <PlayCircleOutlineIcon />
            <Typography>Demo</Typography>
          </Button>

          </Link>
        </Box>
        <Box>
          <Link style={{ textDecoration: "none" }} to={"/login"}>
          {" "}
          <Button className={classes.navlink}>
            {" "}
            <VpnKeyIcon />
            <Typography>Login</Typography>
          </Button>

          </Link>
        </Box>
        <Box>
          <Link style={{ textDecoration: "none" }} to={"/signup"}>
          {" "}
          <Button  className={classes.navlink}>
            {" "}
            <CreateIcon />
            <Typography>Sign Up</Typography>
          </Button>

          </Link>
        </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
