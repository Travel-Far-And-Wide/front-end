import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import mapStyles from "./mapStyles";
import Search from "./Search";
import Locate from "./Locate";
import Info from "./Info";

const useStyles = makeStyles((theme) => ({}));
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

function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const classes = useStyles();

  const onMapClick = React.useCallback((e) => {
    console.log(e);
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(20);
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
      {/* <Locate panTo={panTo} /> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
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
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? <Info selected={selected} setSelected={setSelected} setMarkers={setMarkers} markers={markers}/> : ""}
      </GoogleMap>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, {})(Map);
