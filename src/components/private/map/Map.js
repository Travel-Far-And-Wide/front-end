import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import mapStyles from "./mapStyles";
import Search from "./Search";
import Info from "./Info";
import {
  toggleSelected,
  toggleMarkers,
  toggleSave,
  toggleInfoWindow,
} from "../../../actions/actions";

const useStyles = makeStyles((theme) => ({}));
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
  const classes = useStyles();

  const onMapClick = (e) => {
    console.log(e);
    console.log(props.markers);
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
              url: "/pin.svg",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(35, 35),
            }}
            onClick={() => {
              props.toggleSave(false);
              props.toggleSelected(marker);
              props.toggleInfoWindow(true);
              console.log(props.selected)
              panTo({ lat: marker.lat, lng: marker.lng });
            }}
          />
        ))}
        {props.infoWindow ? <Info /> : ""}
      </GoogleMap>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    markers: state.markers,
    selected: state.selected,
    infoWindow: state.infoWindow,
  };
};
export default connect(mapStateToProps, {
  toggleSelected,
  toggleMarkers,
  toggleSave,
  toggleInfoWindow,
})(Map);
