import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import CalculateDistance from "../reusable/CalculateDistance";
import { connect } from "react-redux";
import { getUserPins, getUserHomepin } from "../../actions/actions";
import {
  Typography,
  TextField,
  MenuItem,
  Grid,
  Card,
  Button,
} from "@material-ui/core";

function Summary(props) {
  const [seriesDataType, setSeriesDataType] = useState("total#");
  const [chartType, setChartType] = useState("bar");
  const [colorState, setColorState] = useState("white");
  const [totalDistance, setTotalDistance] = useState(0);
  const [mostfreq, setMostfreq] = useState(0);
  const [maxDist, setMaxDist] = useState(0);
  const [furthest, setFurthest] = useState({
    pin_id: "",
    user_id: "",
    name: "",
    title: "",
    address: "",
  });
  const [seriesData, setSeriesData] = useState([]);
  const backendCategories = [
    "vacation",
    "camping",
    "roadtrip",
    "daytrip",
    "backpack",
    "work",
  ];
  const categoryLabels = [
    "Vacation 🏖️",
    "Camping ⛺",
    "Road Trip 🚗",
    "Day Trip ☀️",
    "Backpacking 🥾",
    "Work 💼",
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
        categories: categoryLabels,
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
    if (e.target.name === "chartType") {
      setChartType(e.target.value);
    } else if (e.target.name === "seriesDataType") {
      setSeriesDataType(e.target.value);
    }
  };
  useEffect(() => {
    props.getUserPins(localStorage.getItem("user_id"));
    props.getUserHomepin(localStorage.getItem("user_id"));
  }, []);
  useEffect(() => {
    const visited = props.userPins.filter((pin) => pin.visited === true);
    let totalDist = 0;
    props.userPins && props.homepin[0]
      ? (totalDist = visited.reduce(function (accumulator, pin) {
          const distHome = CalculateDistance(props.homepin[0], pin);
          return accumulator + Math.floor(distHome);
        }, 0))
      : (totalDist = 0);
    setTotalDistance(totalDist);

    let currMax = 0;
    let maxPin = {};
    props.userPins && props.homepin[0]
      ? visited.forEach((pin) => {
          const distHome = CalculateDistance(props.homepin[0], pin);
          if (distHome > currMax) {
            maxPin = pin;
          }
          currMax = Math.max(currMax, distHome);
        })
      : (currMax = 0);

    setMaxDist(Math.floor(currMax));
    setFurthest(maxPin);
    const countArray = [];
    if (seriesDataType === "total#") {
      backendCategories.forEach((category) => {
        let count = 0;
        for (let i = 0; i < visited.length; i++) {
          if (visited[i]["category"] === category) {
            count += 1;
          }
        }
        countArray.push(count);
        let i = countArray.indexOf(Math.max(...countArray));
        setMostfreq(i);
      });
      setSeriesData(countArray);
    } else if (seriesDataType === "distanceTrip") {
      backendCategories.forEach((category) => {
        let count = 0;
        for (let i = 0; i < visited.length; i++) {
          if (visited[i]["category"] === category) {
            const distHome = CalculateDistance(props.homepin[0], visited[i]);
            count += Math.floor(distHome);
          }
        }
        countArray.push(count);
      });
      setSeriesData(countArray);
    } else if (seriesDataType === "averageTrip") {
      backendCategories.forEach((category) => {
        let count = 0;
        let numOfTrips = 0;
        for (let i = 0; i < visited.length; i++) {
          if (visited[i]["category"] === category) {
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
        style={{ backgroundColor: "white", marginTop: 100 }}
        className="fade"
        container
        spacing={2}
        justify="center"
      >
        <Card>
          <Typography variant="h2">
            {" "}
            {props.homepin[0]
              ? ""
              : "Please add a home pin before using analytics tool!"}{" "}
          </Typography>
          <Chart
            key={chartType}
            options={
              chartType === "donut"
                ? donutOptions["options"]
                : chartOptions["options"]
            }
            series={
              chartType === "donut"
                ? donutOptions["series"]
                : chartOptions["series"]
            }
            type={chartType}
            width="800"
          />
          <Grid container>
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
        </Card>
        <Card style={{ margin: 50 }}>
          <Grid  style={{margin: 25}}>
            <Grid container justify="center">
              <Typography variant="h5">
                The furthest you've traveled was...
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography  style={{ color: colorState }} variant="h4">
                {maxDist} miles
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography variant="h5">when you went to... </Typography>{" "}
            </Grid>
            <Grid container justify="center">
              <Typography style={{ color: colorState }} variant="h4">
                {furthest["title"]}
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography variant="h5">
                You've traveled a total of...
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography style={{ color: colorState }} variant="h4">
                {totalDistance} miles
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography variant="h5">You most often travel for...</Typography>
            </Grid>
            <Grid container justify="center">
              <Typography style={{ color: colorState }} variant="h4">
                {backendCategories[mostfreq]}
              </Typography>
            </Grid>
            <Grid container style={{ marginTop: 50 }} justify="center">
              <Button
                onClick={() =>
                  colorState === "white" ? setColorState("red") : ""
                }
              >
                Show Insights
              </Button>
            </Grid>
          </Grid>
        </Card>
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
