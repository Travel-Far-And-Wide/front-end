import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../reusable/AppBar";
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
  const logout = () => {
    props.logoutUser();
    window.localStorage.removeItem("token");
  };
  const icon = ["push_pin", "account_circle", "addchart", "exit_to_app"];
  const button = ["My Pins", "My Map", "Summary", "Sign Out"];
  const url = ["/user/pins", "/user", "/user/summary", "/"];
  const buttonFunction = [logout];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const classes = useStyles();

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <React.Fragment>
      {/* <h1><span role="img" aria-label="globe">🌎</span></h1> */}

      <AppBar
        icon={icon}
        button={button}
        url={url}
        buttonFunction={buttonFunction}
      />
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
            icon={{
              url: "/pin.svg",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(35, 35),
            }}
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
