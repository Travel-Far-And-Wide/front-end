import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import {
  editPin,
  toggleEdit,
  toggleSelected,
  toggleSavedPinInfoWindow,
  unpinMarker,

} from "../../../actions/actions";

function EditFields(props) {
  const [editFields, setEditFields] = useState({
    user_id: localStorage.getItem("user_id"),
    name: props.selected.name,
    address: props.selected.address,
    lat: props.selected.lat,
    lng: props.selected.lng,
    date: props.selected.date,
    title: props.selected.title,
    description: props.selected.description,
    image_url: props.selected.image_url,
    category: props.selected.category,
    visited: props.selected.visited,
  });
  const categories = [
    {
      value: "vacation",
      label: "Vacation 🏖️",
    },
    {
      value: "camping",
      label: "Camping ⛺",
    },
    {
      value: "roadtrip",
      label: "Road Trip 🚗",
    },
    {
      value: "daytrip",
      label: "Day Trip ☀️",
    },
    {
      value: "backpack",
      label: "Backpacking 🥾",
    },
    {
      value: "work",
      label: "Work 💼",
    },
  ];
  const handleChanges = (e) => {
    if (e.target.name === "visited") {
      setEditFields({ ...editFields, [e.target.name]: e.target.checked });
    } else {
      setEditFields({ ...editFields, [e.target.name]: e.target.value });
    }
  };
  return (
    <div>
      {props.editToggleBool ? (
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="date"
            value={editFields.date}
            type="date"
            label="Date"
            variant="filled"
            InputLabelProps={{ shrink: true }}
            onChange={handleChanges}
          />
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
          <TextField
            color="secondary"
            select
            fullWidth
            size="small"
            name="category"
            value={editFields.category}
            variant="filled"
            label="Category"
            onChange={handleChanges}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                value={editFields.visited}
                checked={editFields.visited}
                onChange={handleChanges}
                name="visited"
              />
            }
            label="Visited"
          />
        </Grid>
      ) : (
        ""
      )}
      {props.editToggleBool ? (
        <div>
          <Grid container>
            <Grid item xs={6}>
              {" "}
              <Button
                onClick={() => {
                  props.editPin(editFields, props.selected.pin_id);
                  props.toggleEdit(false);
                  props.toggleSelected(null);
                  props.toggleSavedPinInfoWindow(false);
                }}
              >
                Save Edits
              </Button>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Button
                onClick={() => {
                  props.toggleEdit(false);
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
    editToggleBool: state.editToggleBool,
    selected: state.selected,
    markers: state.markers,
  };
};
export default connect(mapStateToProps, {
  editPin,
  toggleEdit,
  toggleSelected,
  toggleSavedPinInfoWindow,
  unpinMarker,
})(EditFields);
