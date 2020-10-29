import React from "react";
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
        <h2>Your destination</h2>
        <p>Time pinned: {formatRelative(props.selected.time, new Date())}</p>
        <Button>Save</Button>
        <Button onClick={() => {}}>Unpin</Button>
      </div>
    </InfoWindow>
  );
}
