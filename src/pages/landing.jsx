import React from "react";
import logo from "../logo.svg";
import LandingLoginButton from "../components/landing-login-button";
import LandingSignupButton from "../components/landing-signup-button";
import FeaturesList from "../components/features-list";
import Typography from "@material-ui/core/Typography";

function Landing() {
  return (
    <section>
      <div align="center">
        <Typography variant="h2">App name</Typography>
        <img src={logo} width="30%" height="30%" /> <br />
        <LandingLoginButton /> <br />
        <LandingSignupButton /> <br />
        <FeaturesList />
      </div>
    </section>
  );
}

export default Landing;
