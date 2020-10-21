import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#105db4",
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    }
  }
});

export default theme;

