import React from "react";

import { connect } from "react-redux";
import Map from "./map/Map";

function Dashboard(props) {
  return (
    <React.Fragment>
      <Map />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, {})(Dashboard);
