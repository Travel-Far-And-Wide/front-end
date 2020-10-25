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
            <Link style={{ textDecoration: "none" }} to={`${props.url[0]}`}>
              {" "}
              <Button style={{ height: 60 }} className={classes.navlink}>
                {" "}
                <Icon>{props.icon[0]}</Icon>
                <Typography variant="h6">{props.button[0]}</Typography>
              </Button>
            </Link>
          </Box>
          <Box>
            <Link style={{ textDecoration: "none" }} to={`${props.url[1]}`}>
              {" "}
              <Button style={{ height: 60 }} className={classes.navlink}>
                {" "}
                <Icon>{props.icon[1]}</Icon>
                <Typography variant="h6">{props.button[1]}</Typography>
              </Button>
            </Link>
          </Box>
          <Box>
            <Link style={{ textDecoration: "none" }} to={`${props.url[2]}`}>
              {" "}
              <Button style={{ height: 60 }} className={classes.navlink}>
                {" "}
                <Icon>{props.icon[2]}</Icon>
                <Typography variant="h6">{props.button[2]}</Typography>
              </Button>
            </Link>
          </Box>
          <Box>
            <Link style={{ textDecoration: "none" }} to={`${props.url[3]}`}>
              {" "}
              <Button style={{ height: 60 }} className={classes.navlink}>
                {" "}
                <Icon>{props.icon[3]}</Icon>
                <Typography variant="h6">{props.button[3]}</Typography>
              </Button>
            </Link>
          </Box>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
