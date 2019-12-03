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

function LinkButton(props) {
  const classes = useStyles();
  return (
    <Link to={props.onClick}>
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
      >
        {props.text}
      </Button>
    </Link>
  );
}

export default LinkButton;
