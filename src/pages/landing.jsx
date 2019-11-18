import React from "react";
import logo from "../logo.svg";
import LandingLoginButton from "../components/landing-login-button";
import LandingSignupButton from "../components/landing-signup-button";
import FeaturesList from "../components/features-list";

function Landing() {
  return (
    <section>
      <div align="center">
        <h1>App Name</h1>
        <img src={logo} width="30%" height="30%" /> <br />
        <LandingLoginButton /> <br />
        <LandingSignupButton /> <br />
        <FeaturesList />
      </div>
    </section>
  );
}

export default Landing;
