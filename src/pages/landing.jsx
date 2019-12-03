import React from 'react';
import logo from '../logo.svg';
import LinkButton from '../components/link-button';
import FeaturesList from '../components/features-list';
import Typography from '@material-ui/core/Typography';
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
              <img src={logo} alt="Application logo" width="60%" height="60%" />
            </Grid>
            <Grid item xs={12}>
              <LinkButton color="primary" destination="/login" text="Log in" />
              <LinkButton color="default" destination="/login" text="Sign up" />
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

export default Landing;
