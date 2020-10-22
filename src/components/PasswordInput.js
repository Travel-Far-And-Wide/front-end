import { InputAdornment, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import PropTypes from "prop-types";
import React, { Component } from "react";

const styles = (theme) => ({
  eye: {
    cursor: "pointer",
  },
});

export default class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordIsMasked: true,
    };
  }

  togglePasswordMask = () => {
    this.setState((prevState) => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  render() {
    const { classes } = this.props;
    const { passwordIsMasked } = this.state;

    return (
      <TextField
        type={passwordIsMasked ? "password" : "text"}
        {...this.props}
        InputProps={{
          endAdornment: this.state.passwordIsMasked ? (
            <InputAdornment position="end">
              <VisibilityOffIcon
                className={classes.eye}
                onClick={this.togglePasswordMask}
              />
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <VisibilityIcon
                className={classes.eye}
                onClick={this.togglePasswordMask}
              />
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};

PasswordInput = withStyles(styles)(PasswordInput);
