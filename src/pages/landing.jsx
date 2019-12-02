import React from 'react';
import logo from '../logo.svg';
import LandingLoginButton from '../components/landing-login-button';
import LandingSignupButton from '../components/landing-signup-button';
import FeaturesList from '../components/features-list';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function Landing() {
  return (
    <section>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <div align="center">
            <Grid item xs={12}>
              <Typography variant="h2">App name</Typography>
            </Grid>
            <Grid item xs={12}>
              <img src={logo} width="60%" height="60%" />
            </Grid>
            <Grid item xs={12}>
              <LandingLoginButton />
              <LandingSignupButton />
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div align="center">
            <Grid item xs={12}>
              <FeaturesList />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

/*<section>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <div align="center">
            <Typography variant="h2">App name</Typography>
            <img src={logo} width="60%" height="60%" /> <br />
            <LandingLoginButton />
            <LandingSignupButton /> <br />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div align="center">
            <FeaturesList />
          </div>
        </Grid>
      </Grid>
    </section>*/

export default Landing;
