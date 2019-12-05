import React from 'react';
import LinkButton from '../components/link-button';
import FeaturesList from '../components/features-list';
import Grid from '@material-ui/core/Grid';
import logoBig from '../assets/images/logo_big.png';

const logo = {
  src: logoBig,
  alt: 'logo',
  width: '70%',
  height: '70%'
};

function Landing() {
  return (
    <section>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <div align="center">
            <Grid item xs={12}>
              <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
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
