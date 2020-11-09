import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  saveFieldInput: {},
}));
export default function SaveFields(props) {
  const classes = useStyles();
  const [saveFields, setSaveFields] = useState({
    name: props.placeId ? props.info.name : "",
    address: props.placeId ? props.info.address : "",
    lat: props.placeId ? props.info.lat : props.lat,
    lng: props.placeId ? props.info.lng : props.lng,
    date: "",
    title: "",
    description: "",
    imageURL: "",
    category: "",
    visited: false,
  });
  const categories = [
    {
      value: 'vacation',
      label: 'Vacation 🏖️',
    },
    {
      value: 'camping',
      label: 'Camping ⛺',
    },
    {
      value: 'roadtrip',
      label: 'Road Trip 🚗',
    },
    {
        value: 'daytrip',
        label: 'Day Trip ☀️',
      },
    {
        value: 'backpack',
        label: 'Backpacking 🥾',
      },    {
      value: 'work',
      label: 'Work 💼',
    },
  ];
  const handleChanges = (e) => {
    if (e.target.name == "visited") {
      setSaveFields({ ...saveFields, [e.target.name]: e.target.checked });
    } else {
      setSaveFields({ ...saveFields, [e.target.name]: e.target.value });
    }

    console.log(saveFields);
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
          name="imageURL"
          value={saveFields.imageURL}
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
    </div>
  );
}
