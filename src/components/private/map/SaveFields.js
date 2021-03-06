import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import {
  savePin,
  toggleSave,
  toggleSelected,
  toggleInfoWindow,
  unpinMarker,
} from "../../../actions/actions";

function SaveFields(props) {
  const [saveFields, setSaveFields] = useState({
    user_id: localStorage.getItem("user_id"),
    name: props.selected.placeId ? props.info.name : "",
    address: props.selected.placeId ? props.info.address : "",
    lat: props.selected.placeId ? props.info.lat : props.selected.lat,
    lng: props.selected.placeId ? props.info.lng : props.selected.lng,
    date: "",
    title: "",
    description: "",
    image_url: "",
    category: "",
    visited: false,
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
      setSaveFields({ ...saveFields, [e.target.name]: e.target.checked });
    } else {
      setSaveFields({ ...saveFields, [e.target.name]: e.target.value });
    }
  };
  return (
    <div>

        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <TextField
            color="secondary"
            fullWidth
            size="small"
            name="date"
            value={saveFields.date}
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
            value={saveFields.title}
            variant="filled"
            label="Title"
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
          <TextField
            color="secondary"
            select
            fullWidth
            size="small"
            name="category"
            value={saveFields.category}
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
                value={saveFields.visited}
                checked={saveFields.visited}
                onChange={handleChanges}
                name="visited"
              />
            }
            label="Visited"
          />
        </Grid>


        <div>
          <Grid container>
            <Grid item xs={6}>
              {" "}
              <Button
                onClick={() => {
                  props.savePin(saveFields);
                  const remove = props.markers.indexOf(props.selected);
                  const clone = props.markers;
                  clone.splice(remove, 1);
                  props.unpinMarker(clone);
                  props.toggleSelected(null);
                  props.toggleInfoWindow(false)
                  
                }}
              >
                Save to pins
              </Button>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Button
                onClick={() => {
                  props.toggleSave(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    info: state.info,
    saveToggleBool: state.saveToggleBool,
    selected: state.selected,
    markers: state.markers,
  };
};
export default connect(mapStateToProps, {
  savePin,
  toggleSave,
  toggleSelected,
  toggleInfoWindow,
  unpinMarker,
})(SaveFields);
