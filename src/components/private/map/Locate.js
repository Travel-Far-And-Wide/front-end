import React from "react";

export default function Locate(props) {
  return (
    <button
      className="locate"
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
      <img src="compass.svg" alt="compass - locate myself" />
    </button>
  );
}
