import React, {useState} from "react";
import { makeStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    saveFieldInput:{
    }
}))
export default function SaveFields(props) {
const classes = useStyles()
const [saveFields, setSaveFields] = useState({
    name: props.placeId ? props.info.name : "",
    address: props.placeId? props.info.address : "",
    lat: props.placeId ? props.info.lat : props.lat,
    lng: props.placeId? props.info.lng : props.lng,
  date: "",
  title: "",
  description: "",
  imageURL: ""  
})
const handleChanges = (e) => {
    setSaveFields({...saveFields, [e.target.name]: e.target.value});
    console.log(saveFields)
}
  return (
    <div>
      <Grid container style={{marginTop: 20, marginBottom:20}}>
        <TextField color="secondary" fullWidth size="small" name="date" value={saveFields.date} type="date" label="Date"  variant="filled" InputLabelProps={{shrink: true}} onChange={handleChanges} />
        <TextField color="secondary" fullWidth size="small" name="title" value={saveFields.title}  variant="filled" label="Title"  onChange={handleChanges}/>
        <TextField color="secondary" fullWidth size="small" name="description" value={saveFields.description}  variant="filled" label="Description"  onChange={handleChanges}/>
        <TextField color="secondary" fullWidth size="small"  name="imageURL" value={saveFields.imageURL} variant="filled" label="Image URL"  onChange={handleChanges}/>
      </Grid>
    </div>
  );
}
