import React, { useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { connect } from "react-redux";
import mapStyles from "./mapStyles";
import Search from "./Search";
import Info from "./Info";
import SavedPinInfo from "./SavedPinInfo";
import SavedHomepinInfo from "./SavedHomepinInfo";
import {
  toggleSelected,
  toggleMarkers,
  toggleSave,
  toggleSaveHomepin,
  toggleInfoWindow,
  toggleSavedPinInfoWindow,
  toggleSavedHomepinInfoWindow,
  getUserPins,
  getUserHomepin,
} from "../../../actions/actions";

const libraries = ["places"];
const mapContainerStyle = {
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

function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const userID = localStorage.getItem('user_id');
  useEffect((props) => {
    props.getUserPins(userID);
    props.getUserHomepin(userID);
  }, []);
  const onMapClick = (e) => {
    props.toggleMarkers({
      placeId: e.placeId,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });
    props.toggleInfoWindow(false);
  };

  const mapRef = React.useRef();
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <React.Fragment>
      {/* <h1><span role="img" aria-label="globe">🌎</span></h1> */}
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {" "}
        {props.markers.map((marker) => (
          <Marker
            key={marker.time}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/marker4.svg",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 30),
            }}
            onClick={() => {
              props.toggleSave(false);
              props.toggleSaveHomepin(false);
              props.toggleSelected(marker);
              props.toggleSavedHomepinInfoWindow(false);
              props.toggleSavedPinInfoWindow(false);
              props.toggleInfoWindow(true);
              console.log(props.selected);
              panTo({ lat: marker.lat, lng: marker.lng });
            }}
          />
        ))}
        {props.userPins.map((marker) => (
          <Marker
            key={marker.time}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/saved_pin.svg",
              scaledSize: new window.google.maps.Size(45, 45),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(22.5, 30),
            }}
            onClick={() => {
              props.toggleSave(false);
              props.toggleSaveHomepin(false);
              props.toggleSelected(marker);
              props.toggleSavedHomepinInfoWindow(false);
              props.toggleInfoWindow(false);
              props.toggleSavedPinInfoWindow(true);
              console.log(props.selected);
              panTo({ lat: marker.lat, lng: marker.lng });
            }}
          />
        ))}
        {props.homepin.map((marker) => (
          <Marker
            key={marker.time}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/home.svg",
              scaledSize: new window.google.maps.Size(45, 45),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(22.5, 30),
            }}
            onClick={() => {
              props.toggleSave(false);
              props.toggleSaveHomepin(false);
              props.toggleSelected(marker);
              props.toggleInfoWindow(false);
              props.toggleSavedPinInfoWindow(false);
              props.toggleSavedHomepinInfoWindow(true);
              console.log(props.selected);
              panTo({ lat: marker.lat, lng: marker.lng });
            }}
          />
        ))}
        {props.infoWindow ? <Info /> : ""}
        {props.savedPinInfoWindow ? <SavedPinInfo /> : ""}
        {props.savedHomepinInfoWindow ? <SavedHomepinInfo /> : ""}
      </GoogleMap>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    markers: state.markers,
    selected: state.selected,
    infoWindow: state.infoWindow,
    savedPinInfoWindow: state.savedPinInfoWindow,
    savedHomepinInfoWindow: state.savedHomepinInfoWindow,
    userPins: state.userPins,
    homepin: state.homepin,
    loggedInUser: state.loggedInUser,
  };
};
export default connect(mapStateToProps, {
  toggleSelected,
  toggleMarkers,
  toggleSave,
  toggleSaveHomepin,
  toggleInfoWindow,
  toggleSavedPinInfoWindow,
  toggleSavedHomepinInfoWindow,
  getUserPins,
  getUserHomepin,
})(Map);
