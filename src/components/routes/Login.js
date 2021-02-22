import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PasswordInput from "../PasswordInput";
import { loginUser } from "../../actions/actions";
import { connect } from "react-redux";

function Login(props) {
  const [loginSubmit, setLoginSubmit] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const handleChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    setLoginSubmit(true);
  }
  useEffect(() => {
    if (loginSubmit === true) {
      props.loginUser(user);
    }
  }, [loginSubmit]);
  useEffect(() => {
    setLoginSubmit(false);
    if (props.loggedInUser.user === undefined) {
      return;
    } else {
      localStorage.setItem("user_id", props.loggedInUser.user.id);
      props.history.push("/user");
    }
  }, [props.loggedInUser.user]);
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

const mapStateToProps = (state) => {
  return {
    data: state.data,
    isLoggedIn: state.isLoggedIn,
    errors: state.errors,
    loggedInUser: state.loggedInUser,
  };
};
export default connect(mapStateToProps, { loginUser })(Login);
