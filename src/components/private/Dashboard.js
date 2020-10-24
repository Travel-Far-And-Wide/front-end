import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/actions";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const useStyles = makeStyles((theme) => ({
  navlink: {
    borderRadius: 5,
    backgroundColor: "#21b6ae",
    padding: "5px 10px",
  },
  dashboardNav: { backgroundColor: "#21b6ae" },
}));
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 34.0522,
  lng: -118.2437, //Coordinates for LA
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function Dashboard(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const classes = useStyles();
  const logout = () => {
    props.logoutUser();
    props.history.push("/");
    window.localStorage.removeItem("token");
  };
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <React.Fragment>
      {/* <h1><span role="img" aria-label="globe">🌎</span></h1> */}
      <Box
        style={{ backgroundColor: "#21b6ae" }}
        height={60}
        width="100%"
        className="fade"
        container
        direction="row"
        justify="space-between"
      >
        <Grid
          style={{ backgroundColor: "#21b6ae" }}
          container
          justify="flex-end"
          height="100%"
        >
          <Box>
            {" "}
            <Button
              onClick={logout}
              style={{ height: 60 }}
              className={classes.navlink}
            >
              {" "}
              <ExitToAppIcon />
              <Typography variant="h6">Sign Out</Typography>
            </Button>
          </Box>
        </Grid>
      </Box>
      {/* <Typography variant="h2">
        Welcome back */}
      {/* {props.loggedInUser.user.username} */}
      {/* </Typography> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        options={options}
        onClick={(e) => {
          console.log(e);
          setMarkers((current) => [
            ...current,
            {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
              time: new Date(),
            },
          ]);
        }}
      >
        {" "}
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    errors: state.errors,
    loggedInUser: state.loggedInUser,
  };
};
export default connect(mapStateToProps, { logoutUser })(Dashboard);
