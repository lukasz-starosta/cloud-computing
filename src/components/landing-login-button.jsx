import React from 'react';
import login from '../pages/login';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

function LandingLoginButton() {
  const classes = useStyles();
  return (
    <Link to="/login">
      <Button variant="contained" color="primary" className={classes.button}>
        Log in
      </Button>
    </Link>
  );
}

export default LandingLoginButton;
