import React from 'react';
import logo from '../logo.svg';
import LandingLoginButton from '../components/landing-login-button';
import LandingSignupButton from '../components/landing-signup-button';
import Button from '../components/button';

function Landing() {
    return (
        <section>
            <div align='center'>
                <h1>App Name</h1>
                <img src ={logo} width ='30%' height ='30%'/> <br/>
                <LandingLoginButton /> <br/>
                <LandingSignupButton />
            </div>
        </section>
    );
}

export default Landing;
