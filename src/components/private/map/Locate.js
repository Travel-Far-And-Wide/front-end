import React from "react";
import Button from "@material-ui/core/Button"
import ExploreIcon from '@material-ui/icons/Explore';
export default function Locate(props) {
  return (
    <Button
      // className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            props.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
          },
          () => null
        );
      }}
    >
      <ExploreIcon/>
      {/* <img src="compass.svg" alt="compass - locate myself" /> */}
    </Button>
  );
}
