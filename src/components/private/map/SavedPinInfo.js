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
  getUserPins,
  toggleEdit,
  deletePin,
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
        {props.editToggleBool ? (
          ""
        ) : (
          <div>
            <h2>{props.selected.title}</h2>
            <h3>Address:</h3> <p>{props.selected.address}</p>
            <h3>Date added:</h3> <p>{props.selected.date}</p>
            <h3>Lat:</h3>
            <p>{props.selected.lat}</p>
            <h3>Lng:</h3>
            <p>{props.selected.lng}</p>
            <h3>Category:</h3>
            <p>{props.selected.category}</p>
            <h3>Visited? </h3> <p>{props.selected.visited ? "Yes" : "No"}</p>
            <img src={props.selected.image_url} />
          </div>
        )}
        <Grid container>
          <Grid item xs={6}>
            {" "}
            {props.editToggleBool ? (
              ""
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
              ""
            ) : (
              <Button
                onClick={() => {
                  props.deletePin(props.selected, props.userPins);
                  props.toggleSelected(null);
                  props.toggleSavedPinInfoWindow(false);
                  props.getUserPins(props.loggedInUser.user.id);
                }}
              >
                Delete
              </Button>
            )}
          </Grid>
        </Grid>
        <EditFields />
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
    loggedInUser: state.loggedInUser,
    userPins: state.userPins
  };
};
export default connect(mapStateToProps, {
  infoSet,
  toggleSelected,
  toggleEdit,
  getUserPins,
  deletePin,
  toggleDelete,
  toggleSavedPinInfoWindow,
})(SavedPinInfo);
