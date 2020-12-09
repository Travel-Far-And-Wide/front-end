import React, { useEffect, useState } from "react";
import axios from "axios";
import { InfoWindow } from "@react-google-maps/api";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditFields from "./EditFields";
import { connect } from "react-redux";
import {
  infoSet,
  toggleSelected,
  unpinMarker,
  toggleEdit,
  toggleDelete,
  toggleSavedPinInfoWindow,
} from "../../../actions/actions";
function SavedPinInfo(props) {
  useEffect(() => {
    if (props.selected.placeId != undefined) {
      axios
        .post(
          `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&placeid=${props.selected.placeId}`
        )
        .then((res) => {
          console.log(res.data.result);

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
        props.toggleSavedPinInfoWindow(false);
      }}
    >
      <div style={{ width: 250 }}>
        <EditFields />
        {props.editToggleBool ? (
          ""
        ) : (
          <div>
            <h2>{props.selected.title}</h2>
            <h3>Address: {props.selected.address}</h3>
            <h3>Date added:{props.selected.date}</h3>
            <h4>Lat:{props.selected.lat}</h4>
            <h4>Lng:{props.selected.lng}</h4>
            <h4>Visited? {props.selected.visited ? "Yes" : "No"}</h4>
          </div>
        )}
        <Grid container>
          <Grid item xs={6}>
            {" "}
            {props.editToggleBool ? (
              <Button
                onClick={() => {
                  props.toggleEdit(false);
                }}
              >
                Save Edit
              </Button>
            ) : (
              <Button
                onClick={() => {
                  props.toggleEdit(true);
                }}
              >
                Edit
              </Button>
            )}
          </Grid>

          <Grid item xs={6}>
            {props.editToggleBool ? (
              <Button
                onClick={() => {
                  props.toggleEdit(false);
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={() => {
                  // const remove = props.markers.indexOf(props.selected);
                  // const clone = props.markers;
                  // clone.splice(remove, 1);
                  // props.unpinMarker(clone);
                  // props.toggleSelected(null);
                  // props.toggleEditdPinInfoWindow(false);
                }}
              >
                Delete
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </InfoWindow>
  );
}
const mapStateToProps = (state) => {
  return {
    info: state.info,
    editToggleBool: state.editToggleBool,
    deleteToggleBool: state.deleteToggleBool,
    markers: state.markers,
    selected: state.selected,
  };
};
export default connect(mapStateToProps, {
  infoSet,
  unpinMarker,
  toggleSelected,
  toggleEdit,
  toggleDelete,
  toggleSavedPinInfoWindow,
})(SavedPinInfo);
