import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  editHomepin,
  toggleHomepinEdit,
  toggleSelected,
  toggleSavedHomepinInfoWindow,
  unpinMarker,
  getUserHomepin,
} from "../../../actions/actions";

function EditHomepinFields(props) {
  const [editFields, setEditFields] = useState({
    user_id: localStorage.getItem("user_id"),
    address: props.selected.address,
    lat: props.selected.lat,
    lng: props.selected.lng,
    title: props.selected.title,
    description: props.selected.description,
    image_url: props.selected.image_url,
  });

  const handleChanges = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {props.editHomepinToggleBool ? (
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="title"
            value={editFields.title}
            variant="filled"
            label="Title"
            onChange={handleChanges}
          />
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="address"
            value={editFields.address}
            variant="filled"
            label="Address"
            onChange={handleChanges}
          />
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="description"
            value={editFields.description}
            variant="filled"
            label="Description"
            onChange={handleChanges}
          />
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="image_url"
            value={editFields.image_url}
            variant="filled"
            label="Image URL"
            onChange={handleChanges}
          />
        </Grid>
      ) : (
        ""
      )}
      {props.editHomepinToggleBool ? (
        <div>
          <Grid container>
            <Grid item xs={6}>
              {" "}
              <Button
                onClick={() => {
                  props.editHomepin(
                    editFields,
                    localStorage.getItem("user_id")
                  );
                  props.toggleHomepinEdit(false);
                  props.toggleSelected(null);
                  props.toggleSavedHomepinInfoWindow(false);
                  props.getUserHomepin(localStorage.getItem("user_id"));
                }}
              >
                Save Edits
              </Button>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Button
                onClick={() => {
                  props.toggleHomepinEdit(false);
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
    editHomepinToggleBool: state.editHomepinToggleBool,
    selected: state.selected,
    markers: state.markers,
  };
};
export default connect(mapStateToProps, {
  editHomepin,
  toggleHomepinEdit,
  toggleSelected,
  toggleSavedHomepinInfoWindow,
  unpinMarker,
  getUserHomepin,
})(EditHomepinFields);
