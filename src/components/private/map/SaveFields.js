import React from "react";
import { makeStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    saveFieldInput:{
    }
}))
export default function SaveFields(props) {
const classes = useStyles()
  return (
    <div>
      <Grid container>
        <TextField fullWidth size="small"  variant="filled" label="Date" />
        <TextField fullWidth size="small"   variant="filled" label="Title"/>
        <TextField fullWidth size="small"   variant="filled" label="Description"/>
        <TextField fullWidth size="small"   variant="filled" label="Image URL"/>
      </Grid>
    </div>
  );
}
