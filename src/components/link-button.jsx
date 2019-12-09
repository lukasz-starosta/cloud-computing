import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none'
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

function LinkButton(props) {
  const { destination, color, text } = props;

  const classes = useStyles();
  return (
    <Link to={destination} className={classes.link}>
      <Button variant="contained" color={color} className={classes.button}>
        {text}
      </Button>
    </Link>
  );
}

export default LinkButton;
