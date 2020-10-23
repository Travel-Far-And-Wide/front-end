import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PasswordInput from "../PasswordInput";
import {axiosAuth} from "../../utils/axiosAuth";

const useStyles = makeStyles((theme) => ({}));
export default function Login(props) {
  const classes = useStyles();
  const [user, setUser] = useState({ username: "", password: "" });
  const handleChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };
  const handleSubmit = (e) => {
    axiosAuth()
      .post("/auth/login", user)
      .then((res) => console.log(res))
      .catch((err) => err);
  };
  return (
    <React.Fragment>
      <Grid className="fade" align="center" style={{ marginTop: 200 }}>
        <Card style={{ height: 300, width: 300 }}>
          <CardContent>
            <form>
              <TextField
                style={{ margin: 20, width: 225 }}
                color="secondary"
                name="username"
                value={user.username}
                label="Username"
                onChange={handleChanges}
              />
              <PasswordInput
                color="secondary"
                label="Password"
                name="password"
                value={user.password}
                onChange={handleChanges}
              />
            </form>
          </CardContent>
          <Button onClick={handleSubmit}>
            {" "}
            <Typography>Sign In</Typography>
          </Button>
        </Card>
        <Typography></Typography>
      </Grid>
    </React.Fragment>
  );
}
