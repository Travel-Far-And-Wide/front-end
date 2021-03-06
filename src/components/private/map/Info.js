import React, { useEffect } from "react";
import axios from "axios";
import { InfoWindow } from "@react-google-maps/api";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveFields from "./SaveFields";
import SaveFieldsHomepin from "./SaveFieldsHomepin";
import { connect } from "react-redux";
import {
  infoSet,
  toggleSelected,
  unpinMarker,
  toggleSave,
  toggleSaveHomepin,
  toggleInfoWindow,
} from "../../../actions/actions";
function Info(props) {
  useEffect(() => {
    if (props.selected.placeId !== undefined) {
      axios
        .post(
          `https://limitless-escarpment-74357.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&placeid=${props.selected.placeId}`
        )
        .then((res) => {
          props.infoSet({
            name: res.data.result.name,
            address: res.data.result.formatted_address,
            lat: res.data.result.geometry.location.lat,
            lng: res.data.result.geometry.location.lng,
          });
        })
        .catch((err) => console.log(err));
    } else {
      console.log(props.selected);
    }
  }, [props.selected]);
  return (
    <InfoWindow
      position={{ lat: props.selected.lat, lng: props.selected.lng }}
      onCloseClick={() => {
        props.toggleInfoWindow(false);
      }}
    >
      <div style={{ width: 525 }}>
        {props.selected.placeId ? (
          <div>
            <h2>{props.info.name}</h2>
            <h3>{props.info.address}</h3>
          </div>
        ) : (
          <div>
            {" "}
            <h2>Your destination</h2>
            <h4>Lat:{props.selected.lat}</h4>
            <h4>Lng:{props.selected.lng}</h4>
          </div>
        )}
        <Grid container direction="row" justify="space-between">
          <Grid item xs={3} spacing={3}>
            {" "}
            {props.saveToggleBool || props.saveHomepinToggleBool ? (
              ""
            ) : (
              <Button
                onClick={() => {
                  props.toggleSave(true);
                  props.toggleSaveHomepin(false);
                }}
              >
                Save Pin
              </Button>
            )}
          </Grid>

          <Grid item xs={3} spacing={3}>
            {" "}
            {props.saveToggleBool || props.saveHomepinToggleBool ? (
              ""
            ) : (
              <Button
                onClick={() => {
                  props.toggleSaveHomepin(true);
                  props.toggleSave(false);
                }}
              >
                Set Home
              </Button>
            )}
          </Grid>

          <Grid item xs={3} spacing={3}>
            {props.saveToggleBool || props.saveHomepinToggleBool ? (
              ""
            ) : (
              <Button
                onClick={() => {
                  const remove = props.markers.indexOf(props.selected);
                  const clone = props.markers;
                  clone.splice(remove, 1);
                  props.unpinMarker(clone);
                  props.toggleSelected(null);
                  props.toggleInfoWindow(false);
                }}
              >
                Remove Pin
              </Button>
            )}
          </Grid>
        </Grid>
        {props.saveToggleBool ? (
          <SaveFields
            placeId={props.selected.placeId}
            lat={props.selected.lat}
            lng={props.selected.lng}
          />
        ) : (
          ""
        )}
        {props.saveHomepinToggleBool ? (
          <SaveFieldsHomepin
            placeId={props.selected.placeId}
            lat={props.selected.lat}
            lng={props.selected.lng}
          />
        ) : (
          ""
        )}
      </div>
    </InfoWindow>
  );
}
const mapStateToProps = (state) => {
  return {
    info: state.info,
    saveToggleBool: state.saveToggleBool,
    saveHomepinToggleBool: state.saveHomepinToggleBool,
    markers: state.markers,
    selected: state.selected,
  };
};
export default connect(mapStateToProps, {
  infoSet,
  unpinMarker,
  toggleSelected,
  toggleSave,
  toggleSaveHomepin,
  toggleInfoWindow,
})(Info);
