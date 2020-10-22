import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PasswordInput from "../PasswordInput";

const useStyles = makeStyles((theme) => ({}));
export default function Login(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid align="center" style={{ marginTop: 200 }}>
        <Card style={{ height: 300, width: 300 }}>
          <CardContent>
            <form>
              <TextField
                style={{ margin: 20, width: 225 }}
                color="secondary"
                label="Username or Email"
              />
              <PasswordInput
                color="secondary"
                label="Password"
                name="password"
              />
            </form>
          </CardContent>
          <Button>
            {" "}
            <Typography>Sign In</Typography>
          </Button>
        </Card>
        <Typography></Typography>
      </Grid>
    </React.Fragment>
  );
}
