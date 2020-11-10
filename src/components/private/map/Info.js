import React, { useEffect, useState } from "react";
import axios from "axios";
import { InfoWindow } from "@react-google-maps/api";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveFields from "./SaveFields";
import { connect } from "react-redux";
import { infoSet, toggleSave } from "../../../actions/actions";
function Info(props) {
  const [save, setSave] = useState(false);
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
        props.setSelected(null);
      }}
    >
      <div style={{ width: 250 }}>
        {props.selected.placeId ? (
          <div>
            <h2>{props.info.name}</h2>
            <h3>{props.info.address}</h3>
          </div>
        ) : (
          <div>
            {" "}
            <h2>Your destination</h2>
            <h4>Lat:{props.selected.lat}</h4>
            <h4>Lng:{props.selected.lng}</h4>
          </div>
        )}
        <Grid container>
          <Grid item xs={6}>
            {" "}
            {props.saveToggleBool ? (
              <Button onClick={() => setSave(!save)}>Save to pins</Button>
            ) : (
              <Button
                onClick={() => {
                  console.log(props.selected);
                  props.toggleSave(true);
                  console.log(props.saveToggleBool);
                }}
              >
                Save
              </Button>
            )}
          </Grid>

          <Grid item xs={6}>
            {props.saveToggleBool ? (
              <Button
                onClick={() => {
                  props.toggleSave(false);
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const remove = props.markers.indexOf(props.selected);
                  const clone = [...props.markers];
                  clone.splice(remove, 1);
                  props.setMarkers(clone);
                  props.setSelected(null);
                }}
              >
                Unpin
              </Button>
            )}
          </Grid>
        </Grid>
        <SaveFields
          save={save}
          placeId={props.selected.placeId}
          lat={props.selected.lat}
          lng={props.selected.lng}
        />
      </div>
    </InfoWindow>
  );
}
const mapStateToProps = (state) => {
  return { info: state.info, saveToggleBool: state.saveToggleBool };
};
export default connect(mapStateToProps, { infoSet, toggleSave })(Info);
