import React, { useEffect } from "react";
import axios from "axios";
import { InfoWindow } from "@react-google-maps/api";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditHomepinFields from "./EditHomepinFields";
import { connect } from "react-redux";
import {
  infoSet,
  toggleSelected,
  getUserHomepin,
  toggleHomepinEdit,
  deleteHomepin,
  toggleHomepinDelete,
  toggleSavedHomepinInfoWindow,
} from "../../../actions/actions";
function SavedHomepinInfo(props) {
  useEffect(
    (props) => {
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
    },
    [props.selected]
  );

  return (
    <InfoWindow
      position={{ lat: props.selected.lat, lng: props.selected.lng }}
      onCloseClick={() => {
        props.toggleSavedHomepinInfoWindow(false);
      }}
    >
      <div style={{ width: 250 }}>
        {props.editHomepinToggleBool ? (
          ""
        ) : (
          <div>
            <img alt="" src={props.selected.image_url} />
            <h2>{props.selected.title}</h2>
            <h3>
              Address <span role="img" aria-label="pin">📍</span>
            </h3>{" "}
            <p>{props.selected.address}</p>
            <h3>
              Description <span role="img" aria-label="paper">📝</span>
            </h3>{" "}
            <p>{props.selected.description}</p>
          </div>
        )}
        <Grid container>
          <Grid item xs={6}>
            {" "}
            {props.editHomepinToggleBool ? (
              ""
            ) : (
              <Button
                onClick={() => {
                  props.toggleHomepinEdit(true);
                  console.log(props.editHomepinToggleBool);
                }}
              >
                Edit
              </Button>
            )}
          </Grid>

          <Grid item xs={6}>
            {props.editHomepinToggleBool ? (
              ""
            ) : (
              <Button
                onClick={() => {
                  props.deleteHomepin(
                    localStorage.getItem("user_id"),
                    props.homepin
                  );
                  props.toggleSelected(null);
                  props.toggleSavedHomepinInfoWindow(false);
                  props.getUserHomepin(localStorage.getItem("user_id"));
                }}
              >
                Delete
              </Button>
            )}
          </Grid>
        </Grid>
        <EditHomepinFields />
      </div>
    </InfoWindow>
  );
}
const mapStateToProps = (state) => {
  return {
    info: state.info,
    editHomepinToggleBool: state.editHomepinToggleBool,
    deleteHomepinToggleBool: state.deleteHomepinToggleBool,
    markers: state.markers,
    selected: state.selected,
    loggedInUser: state.loggedInUser,
    homepin: state.homepin,
  };
};
export default connect(mapStateToProps, {
  infoSet,
  toggleSelected,
  toggleHomepinEdit,
  getUserHomepin,
  deleteHomepin,
  toggleHomepinDelete,
  toggleSavedHomepinInfoWindow,
})(SavedHomepinInfo);
