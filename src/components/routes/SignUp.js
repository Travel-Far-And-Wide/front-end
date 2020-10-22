import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PasswordInput from "../PasswordInput";

const useStyles = makeStyles((theme) => ({
  inputField: { margin: 20, width: 225 },
}));
export default function SignUp(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid align="center" style={{ marginTop: 200 }}>
        <Card style={{ height: 300, width: 300 }}>
          <CardContent>
            <form>
              <TextField
                className={classes.inputField}
                color="secondary"
                label="Username"
              />
              <PasswordInput
                color="secondary"
                label="Password"
                name="password"
              />
              <TextField
                className={classes.inputField}
                color="secondary"
                label="Email"
              />
            </form>
          </CardContent>
          <Button>
            {" "}
            <Typography>Sign Up</Typography>
          </Button>
        </Card>
        <Typography></Typography>
      </Grid>
    </React.Fragment>
  );
}
