import React from "react";
import logo from "../logo.svg";
import LandingLoginButton from "../components/landing-login-button";
import LandingSignupButton from "../components/landing-signup-button";
import FeaturesList from "../components/features-list";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

/*const useStyles = makeStyles(theme => ({
    left: {
        float: left,
    }
  }));*/

function Landing() {
  return (
    <section>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <div align="center">
            <Typography variant="h2">App name</Typography>
            <img src={logo} width="60%" height="60%" /> <br />
            <LandingLoginButton /> <br />
            <LandingSignupButton /> <br />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div align="center">
            <FeaturesList />
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default Landing;
