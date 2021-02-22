import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  saveHomepin,
  toggleSaveHomepin,
  toggleSelected,
  toggleInfoWindow,
  unpinMarker,
  deleteHomepin,
} from "../../../actions/actions";

function SaveFieldsHomepin(props) {
  const [saveFields, setSaveFields] = useState({
    user_id: localStorage.getItem("user_id"),
    address: props.selected.placeId ? props.info.address : "",
    lat: props.selected.placeId ? props.info.lat : props.selected.lat,
    lng: props.selected.placeId ? props.info.lng : props.selected.lng,
    title: "",
    description: "",
    image_url: "",
  });
  const handleChanges = (e) => {
    setSaveFields({ ...saveFields, [e.target.name]: e.target.value });

    console.log(saveFields);
  };
  return (
    <div>
      {props.saveHomepinToggleBool ? (
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="title"
            value={saveFields.title}
            variant="filled"
            label="Title"
            onChange={handleChanges}
          />
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="address"
            value={saveFields.address}
            variant="filled"
            label="Address"
            onChange={handleChanges}
          />
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="description"
            value={saveFields.description}
            variant="filled"
            label="Description"
            onChange={handleChanges}
          />
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="image_url"
            value={saveFields.image_url}
            variant="filled"
            label="Image URL"
            onChange={handleChanges}
          />
        </Grid>
      ) : (
        ""
      )}
      {props.saveHomepinToggleBool ? (
        <div>
          <Grid container>
            <Grid item xs={6}>
              {" "}
              <Button
                onClick={() => {
                  props.deleteHomepin(localStorage.getItem("user_id"));
                  const remove = props.markers.indexOf(props.selected);
                  const clone = props.markers;
                  clone.splice(remove, 1);
                  props.unpinMarker(clone);
                  props.toggleSelected(null);
                  props.toggleInfoWindow(false);
                  props.saveHomepin(saveFields);
                }}
              >
                Save as Home
              </Button>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Button
                onClick={() => {
                  props.toggleSaveHomepin(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    info: state.info,
    saveHomepinToggleBool: state.saveHomepinToggleBool,
    selected: state.selected,
    markers: state.markers,
    homepin: state.homepin,
  };
};
export default connect(mapStateToProps, {
  toggleSaveHomepin,
  toggleSelected,
  toggleInfoWindow,
  unpinMarker,
  saveHomepin,
  deleteHomepin,
})(SaveFieldsHomepin);
