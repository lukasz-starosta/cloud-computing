import React from 'react';
import { colors } from '../assets/colors';
import TextField from '@material-ui/core/TextField';
import { Typography, makeStyles } from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles(theme => ({
  commentStyle: {
    backgroundColor: blueGrey[700],
    width: 580,
    borderRadius: '8px',
    margin: '10px',
    paddingLeft: '10px',
    paddingTop: '3px',
    paddingBottom: '30px',
    paddingRight: '10px'
  },
  textStyle: {
    color: 'white',
    fontSize: 15,
    paddingLeft: '30px'
  },
  userStyle: {
    color: 'white',
    fontSize: 20
  }
}));

function Comment(props) {
  const { username, content } = props;
  const classes = useStyles();

  return (
    <div className={classes.commentStyle}>
      <Typography className={classes.userStyle}>{username}</Typography>
      <Typography className={classes.textStyle}>{content}</Typography>
    </div>
  );
}
export default Comment;
