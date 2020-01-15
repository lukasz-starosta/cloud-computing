import React from 'react';
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
  },
  timeStyle: {
    color: 'white',
    fontSize: 10,
    float: 'right'
  }
}));

function Comment(props) {
  const { username, content, time } = props;
  const classes = useStyles();

  return (
    <div className={classes.commentStyle}>
      <Typography className={classes.userStyle}>{username}</Typography>
      <Typography className={classes.textStyle}>{content}</Typography>
      <Typography className={classes.timeStyle}>{time}</Typography>
    </div>
  );
}
export default Comment;
