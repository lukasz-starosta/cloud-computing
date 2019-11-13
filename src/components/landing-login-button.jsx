import React from 'react';
import login from '../pages/login';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

// This is only an example of a component
function LandingLoginButton() {
    const classes = useStyles();
    return <Button variant ="contained" color="primary" href="login" className={classes.button}>Log in</Button>;
}

export default LandingLoginButton;