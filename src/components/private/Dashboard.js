import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  navlink: {
    borderRadius: 5,
    backgroundColor: "#21b6ae",
    padding: "5px 10px",
  },
}));
export default function Dashboard (props) {
  const classes = useStyles();
console.log(props, "These are your props")
  return (
    <React.Fragment>
      <Grid className = "fade" container justify="center" style={{marginTop: 100}}>
      <Typography>Welcome</Typography>
      </Grid>
    </React.Fragment>
  );
}
