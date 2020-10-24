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
      <Box
        style={{ backgroundColor: "#21b6ae" }}
        height={60}
        width="100%"
        className="fade"
        container
        direction="row"
        justify="space-between"
      >
        {/* <Box width="50%">
          <Link style={{ textDecoration: "none" }}  >
            <Button>
              <PublicIcon />
              <Typography>Travel Far & Wide</Typography>
            </Button>
          </Link>
        </Box> */}
        <Grid
          style={{ backgroundColor: "#21b6ae" }}
          container
          justify="flex-end"
          height="100%"
        >
          <Box>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              {" "}
              <Button style={{ height: 60 }} className={classes.navlink}>
                {" "}
                <HomeIcon />
                <Typography variant="h6">Home</Typography>
              </Button>
            </Link>
          </Box>
          <Box>
            <Link style={{ textDecoration: "none" }} to={"/demo"}>
              {" "}
              <Button style={{ height: 60 }} className={classes.navlink}>
                {" "}
                <PlayCircleOutlineIcon />
                <Typography variant="h6">Demo</Typography>
              </Button>
            </Link>
          </Box>
          <Box>
            <Link style={{ textDecoration: "none" }} to={"/login"}>
              {" "}
              <Button style={{ height: 60 }} className={classes.navlink}>
                {" "}
                <VpnKeyIcon />
                <Typography variant="h6">Login</Typography>
              </Button>
            </Link>
          </Box>
          <Box>
            <Link style={{ textDecoration: "none" }} to={"/signup"}>
              {" "}
              <Button style={{ height: 60 }} className={classes.navlink}>
                {" "}
                <CreateIcon />
                <Typography variant="h6">Sign Up</Typography>
              </Button>
            </Link>
          </Box>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
