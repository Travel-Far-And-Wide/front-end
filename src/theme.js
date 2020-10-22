import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides:{
MuiButton:{
  root:{
    backgroundColor: "#21b6ae",
    '&:hover': {
        backgroundColor:"#1D938C",
      
    }
  },
  text:{
    color: 'white'
  }
}
  },
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#21b6ae",
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    }
  }
});

export default theme;

