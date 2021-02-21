import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@material-ui/core/styles";
import CalculateDistance from "../reusable/CalculateDistance";
import { connect } from "react-redux";
import { getUserPins, getUserHomepin } from "../../actions/actions";
import { Typography, TextField, MenuItem, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navlink: {
    borderRadius: 5,
    backgroundColor: "#21b6ae",
    padding: "5px 10px",
  },
  dashboardNav: { backgroundColor: "#21b6ae" },
}));

function Summary(props) {
  const classes = useStyles();
  const [seriesDataType, setSeriesDataType] = useState("total#");
  const [chartType, setChartType] = useState("bar");
  const [seriesData, setSeriesData] = useState([]);
  const backendCategories = [
    "vacation",
    "camping",
    "roadtrip",
    "daytrip",
    "backpack",
    "work",
  ];
  const chartCategories = [
    {
      value: "bar",
      label: "Bar",
    },
    {
      value: "radar",
      label: "Radar",
    },
    {
      value: "donut",
      label: "Donut",
    },
  ];
  const seriesDataTypeCat = [
    {
      value: "total#",
      label: "Total # of each Trip Type",
    },
    {
      value: "distanceTrip",
      label: "Total Distance per Trip Type (Miles)",
    },

    {
      value: "averageTrip",
      label: "Average Distance per Trip Type (Miles)",
    },
  ];
  const chartTitle = {
    averageTrip: "Average Distance per Trip Type (Miles)",
    "total#": "Total # of each Trip Type",
    distanceTrip: "Total Distance per Trip Type (Miles)",
  };
  const chartOptions = {
    options: {
      chart: {},
      theme: {
        palette: "palette2",
      },
      title: {
        text: chartTitle[seriesDataType],
      },
      xaxis: {
        categories: [
          "Vacation 🏖️",
          "Camping ⛺",
          "Road Trip 🚗",
          "Day Trip ☀️",
          "Backpacking 🥾",
          "Work 💼",
        ],
      },
    },
    series: [
      {
        name: seriesDataType,
        data: seriesData,
      },
    ],
  };
  const donutOptions = {
    series: seriesData,
    options: {
      chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2,
        },
      },
      stroke: {
        width: 0,
      },

      labels: [
        "Vacation 🏖️",
        "Camping ⛺",
        "Road Trip 🚗",
        "Day Trip ☀️",
        "Backpacking 🥾",
        "Work 💼",
      ],
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8,
        },
      },
      states: {
        hover: {
          filter: "none",
        },
      },
      theme: {
        palette: "palette2",
      },
      title: {
        text: chartTitle[seriesDataType],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const handleChanges = (e) => {
    if (e.target.name == "chartType") {
      setChartType(e.target.value);
    } else if (e.target.name == "seriesDataType") {
      setSeriesDataType(e.target.value);
    }
  };
  useEffect(() => {
    props.getUserPins(localStorage.getItem("userID"));
    props.getUserHomepin(localStorage.getItem("userID"));
  }, []);
  useEffect(() => {
    const visited = props.userPins.filter((pin) => pin.visited == true);
    // const totalDist = visited.reduce(function (accumulator, pin) {
    //   const distHome = CalculateDistance(props.homepin[0], pin);
    //   return accumulator + Math.floor(distHome);
    // }, 0);
    const countArray = [];
    if (seriesDataType == "total#") {
      backendCategories.forEach((category) => {
        let count = 0;
        for (let i = 0; i < visited.length; i++) {
          if (visited[i]["category"] == category) {
            count += 1;
          }
        }
        countArray.push(count);
      });
      setSeriesData(countArray);
    } else if (seriesDataType == "distanceTrip") {
      backendCategories.forEach((category) => {
        let count = 0;
        for (let i = 0; i < visited.length; i++) {
          if (visited[i]["category"] == category) {
            const distHome = CalculateDistance(props.homepin[0], visited[i]);
            count += Math.floor(distHome);
          }
        }
        countArray.push(count);
      });
      setSeriesData(countArray);
    } else if (seriesDataType == "averageTrip") {
      backendCategories.forEach((category) => {
        let count = 0;
        let numOfTrips = 0;
        for (let i = 0; i < visited.length; i++) {
          if (visited[i]["category"] == category) {
            const distHome = CalculateDistance(props.homepin[0], visited[i]);
            count += Math.floor(distHome);
            numOfTrips += 1;
          }
        }
        numOfTrips > 0
          ? countArray.push(Math.floor(count / numOfTrips))
          : countArray.push(0);
      });
      setSeriesData(countArray);
    }
  }, [props.userPins, props.homepin, seriesDataType]);

  return (
    <React.Fragment>
      <Grid
        style={{ backgroundColor: "white" }}
        width="100%"
        className="fade"
        container
        justify="center"
      >
        <Typography variant="h2">
          {" "}
          {props.homepin[0]
            ? ""
            : "Please add a home pin before using analytics tool!"}{" "}
        </Typography>
        <Chart
          key={chartType}
          options={
            chartType == "donut"
              ? donutOptions["options"]
              : chartOptions["options"]
          }
          series={
            chartType == "donut"
              ? donutOptions["series"]
              : chartOptions["series"]
          }
          type={chartType}
          width="800"
        />
        <Grid container justify="center">
          <TextField
            color="secondary"
            select
            fullWidth
            style={{ textAlign: "center", width: "450px", margin: "20px" }}
            size="small"
            name="chartType"
            value={chartType}
            variant="filled"
            label="Chart Type"
            onChange={handleChanges}
          >
            {chartCategories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            color="secondary"
            select
            fullWidth
            style={{ textAlign: "center", width: "450px", margin: "20px" }}
            size="small"
            name="seriesDataType"
            value={seriesDataType}
            variant="filled"
            label="Data Type"
            onChange={handleChanges}
          >
            {seriesDataTypeCat.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    errors: state.errors,
    loggedInUser: state.loggedInUser,
    userPins: state.userPins,
    homepin: state.homepin,
  };
};
export default connect(mapStateToProps, { getUserPins, getUserHomepin })(
  Summary
);
