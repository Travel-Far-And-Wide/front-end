import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({}));
function MyPins(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid width="100%" style={{marginTop: 100}}container justify="center">
        <Typography variant="h3">
          Coming soon! Why not check out our maps and summary feature :) while
          you wait?
        </Typography>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, {})(MyPins);
