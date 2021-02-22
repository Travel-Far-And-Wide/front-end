import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Map from "./map/Map";

const useStyles = makeStyles((theme) => ({
  navlink: {
    borderRadius: 5,
    backgroundColor: "#21b6ae",
    padding: "5px 10px",
  },
  dashboardNav: { backgroundColor: "#21b6ae" },
}));

function Dashboard(props) {
  const classes = useStyles();
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
