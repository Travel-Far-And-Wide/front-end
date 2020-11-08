import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
export default function Info(props) {
  const [infoName, setInfoName] = useState("");
  useEffect(() => {
    if (props.selected.placeId != undefined) {
      axios
        .post(
          `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&placeid=${props.selected.placeId}`
        )
        .then((res) => {
          console.log(res.data.result.name);
          setInfoName(res.data.result.name);
        })
        .catch((err) => console.log(err));
    }
  }, [props.selected]);
  return (
    <InfoWindow
      position={{ lat: props.selected.lat, lng: props.selected.lng }}
      onCloseClick={() => {
        props.setSelected(null);
      }}
    >
      <div>
        {props.selected.placeId ? (
          <h2>{infoName}</h2>
        ) : (
          <h2>Your destination</h2>
        )}
        <p>Time pinned: {formatRelative(props.selected.time, new Date())}</p>
        <Button onClick={() => console.log(props.selected)}>Save</Button>
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
      </div>
    </InfoWindow>
  );
}
