import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  login: {
    borderRadius: 5,
    backgroundColor: "#21b6ae",
    padding: "5px 10px",
  },
}));
export default function NavBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
          <Grid align="center" style={{marginTop: 200}}>
              <Card style={{height: 400, width: 300}}>
                  <CardContent></CardContent>
                  <Button></Button>
              </Card>
        <Typography></Typography>
      </Grid>
    </React.Fragment>
  );
}
