import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e64141",
    },
    secondary: {
      main: "#105db4",
    },
  },
  typography: {
    
    button: {
      textTransform: 'none',
      color: "#fff"
    }
  }
});

export default theme;

