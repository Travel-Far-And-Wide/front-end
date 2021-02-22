import React, { useState, useCallback } from "react";
import Locate from "./Locate";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  toggleSelected,
  toggleMarkers,
} from "../../../actions/actions";
function Search(props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 34.0522, lng: () => -118.2437 },
      radius: 200 * 1000,
    },
  });
  return (
    <div className="search">
      <Grid className="searchContainer" container align="center">
        <Locate panTo={props.panTo} />
        <div>
          <Combobox
            className="cb"
            style={{ borderRadius: 5 }}
            onSelect={async (address) => {
              setValue(address, false);
              clearSuggestions();
              try {
                const results = await getGeocode({ address });
                const { lat, lng } = await getLatLng(results[0]);
                props.panTo({ lat, lng });
                props.toggleMarkers({
                  lat: lat,
                  lng: lng,
                  time: new Date(),
                });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <ComboboxInput
              className="cbinput"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              disabled={!ready}
              placeholder="Enter an address"
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>{" "}
        </div>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {

  };
};
export default connect(mapStateToProps, {
  toggleSelected,
  toggleMarkers,
})(Search);
