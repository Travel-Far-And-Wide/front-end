import React, { cloneElement } from "react";
import Button from "@material-ui/core/Button";
import { InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
export default function Info(props) {
  return (
    <InfoWindow
      position={{ lat: props.selected.lat, lng: props.selected.lng }}
      onCloseClick={() => {
        props.setSelected(null);
      }}
    >
      <div>
        {props.selected.placeId != undefined ? (
          <h2>{props.selected.placeId}</h2>
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
