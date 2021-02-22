import React, { useEffect } from "react";
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
    if (props.selected.placeId !== undefined) {
      axios
        .post(
          `https://limitless-escarpment-74357.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&placeid=${props.selected.placeId}`
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
  const categories = {
    vacation: "Vacation 🏖️",

    camping: "Camping ⛺",

    roadtrip: "Road Trip 🚗",

    daytrip: "Day Trip ☀️",

    backpack: "Backpacking 🥾",

    work: "Work 💼",
  };
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
            <img alt="" src={props.selected.image_url} />
            <h2>{props.selected.title}</h2>
            <h2>{props.selected.name ? `${props.selected.name}` : ""}</h2>
            <h3>{categories[props.selected.category]}</h3>
            <h3>
              Address{" "}
              <span role="img" aria-label="pin">
                📍
              </span>
            </h3>{" "}
            <p>{props.selected.address}</p>
            <h3>
              Date added{" "}
              <span role="img" aria-label="calendar">
                📅
              </span>
            </h3>{" "}
            <p>{props.selected.date}</p>
            <h3>
              Description{" "}
              <span role="img" aria-label="paper">
                📝
              </span>
            </h3>{" "}
            <p>{props.selected.description}</p>
            <h3>Visited</h3> <p>{props.selected.visited ? "✔️" : "❌"}</p>
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
                  props.getUserPins(localStorage.getItem("user_id"));
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
    userPins: state.userPins,
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
