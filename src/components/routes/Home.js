import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Filler1 from "../../assets/filler1.jpg";
import Filler2 from "../../assets/filler2.jpg";
import banner from "../../assets/home.jpg";
const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 5,
    backgroundColor: "#21b6ae",
    padding: "5px 10px",
    marginTop: 50,
  },

  mainFeaturedPost: {
    position: "relative",
    margin: "100px 0",
    height: 400,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));
export default function NavBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className={classes.overlay} />
        <div className={classes.mainFeaturedPostContent}>
          <Typography align="center" variant="h3" color="primary">
            Turn your wanderlust into something more.
          </Typography>
        </div>
      </Paper>
      <Grid container justify="center" style={{ marginTop: 50 }}>
        <Typography variant="h5" >
          Travel Far and Wide aims to give you the definitive tool to keep track
          of where you've been, and where you're going.
        </Typography>
      </Grid>
      <Grid
        container
        justify="center"
        style={{ marginTop: 25, marginBottom: 50 }}
      >
        <Button className={classes.button} color="primary">
          Watch a demo!
        </Button>
      </Grid>
      <Grid container justify="space-around" style={{ marginTop: 25 }}>
        <Card>
          <CardMedia style={{ height: 250, width: 250 }} image={Filler1} />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Pin It
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Testing filler text
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardMedia style={{ height: 250, width: 250 }} image={Filler2} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Upload It
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Testing filler text
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container style={{ marginTop: 50 }}>
        <Typography variant="h4" >
          Integrating data and travel
        </Typography>
        <Typography variant="h5" >
          You can now keep track of the little things through our "Year in
          Summary" feature - giving you a new perspective on how you travel.
        </Typography>
      </Grid>
    </React.Fragment>
  );
}
