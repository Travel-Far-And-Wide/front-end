import React from "react";
import Grid from "@material-ui/core/Grid";

export default function Demo (props) {

  return (
    <React.Fragment>
      <Grid className = "fade" container justify="center" style={{marginTop: 100}}>
      <iframe title="demo" width="560" height="315" src="https://youtu.be/c3CRF2iSyvA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Grid>
    </React.Fragment>
  );
}
