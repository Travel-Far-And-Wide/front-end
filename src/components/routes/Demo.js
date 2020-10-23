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
export default function Demo (props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid className = "fade" container justify="center" style={{marginTop: 100}}>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/qrHIIYsnpMg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Grid>
    </React.Fragment>
  );
}
