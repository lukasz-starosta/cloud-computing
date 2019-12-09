import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
});

function UserLink({ userUid, username, additionalClasses }) {
  const classes = useStyles();

  return (
    <Link to={`/profile/${userUid}`} className={clsx(classes.link, additionalClasses)}>
      {username}
    </Link>
  );
}

export default UserLink;
