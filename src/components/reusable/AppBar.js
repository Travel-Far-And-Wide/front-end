import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlink: {
    // backgroundColor: "#21b6ae",
    // '&:hover': {
    //     backgroundColor:"#1D938C",
    // }
  },
}));
export default function AppBar(props) {
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
          {props.dashboardData
            ? props.dashboardData.map((e) => (
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
