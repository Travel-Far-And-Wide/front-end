import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PasswordInput from "../PasswordInput";
import { registerNewUser } from "../../actions/actions";
import { connect } from "react-redux";
import Map from "../../assets/signup_stock.jpg";

const useStyles = makeStyles((theme) => ({
  inputField: { margin: 20, width: 225 },
}));
function SignUp(props) {
  const classes = useStyles();
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState({
    errorUser: false,
    errorPass: false,
    errorEmail: false,
  });
  const handleChanges = (e) => {
    newUser.password.length > 4
      ? setError({ ...error, errorPass: false })
      : setError({ ...error, errorPass: true });
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log(newUser);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.registerNewUser(newUser);
    props.history.push("/login")
    // axios
    //   .post("http://localhost:4000/auth/register", newUser)
    //   .then((res) => (res.status == 201 ? props.history.push("/login") : ""))
    //   .catch((err) => {
    //     console.log(err);
    //     setError({ ...error, errorUser: true, errorEmail: true });
    //   });
  };
  return (
    <React.Fragment>
      <Grid className="fade" container justify="center" style={{ marginTop: 200 }}>
        <div>
          <img style={{ height: 600, width: 350, borderRadius: 5, marginRight: 30}} src={Map} />
        </div>
<div>
        <Card align="center" style={{ height: 400, width: 300, marginTop: 100}}>
          <CardContent>
            <form>
              <TextField
                className={classes.inputField}
                error={error.errorUser}
                helperText={
                  error.errorUser
                    ? "Username may be in-use, try another"
                    : "*Required"
                }
                color="secondary"
                label="Username"
                name="username"
                value={newUser.username}
                onChange={handleChanges}
              />

              <PasswordInput
                error={error.errorPass}
                helperText={
                  error.errorPass
                    ? "Password must be min. 5 characters"
                    : "*Required"
                }
                color="secondary"
                label="Password"
                name="password"
                value={newUser.password}
                onChange={handleChanges}
              />
              <TextField
                error={error.errorEmail}
                helperText={
                  error.errorEmail
                    ? "Email may be in-use, try another"
                    : "*Required"
                }
                className={classes.inputField}
                color="secondary"
                label="Email"
                name="email"
                value={newUser.email}
                onChange={handleChanges}
              />
            </form>
          </CardContent>
          <Button onClick={handleSubmit}>
            {" "}
            <Typography>Sign Up</Typography>
          </Button>
        </Card>
        </div>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    errors: state.errors,
  };
};
export default connect(mapStateToProps, { registerNewUser })(SignUp);
