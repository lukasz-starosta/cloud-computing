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

function UserLink({ user, additionalClasses }) {
  const classes = useStyles();

  return (
    <Link to={`/profile/${user.id}`} className={clsx(classes.link, additionalClasses)}>
      {user.data().name}
    </Link>
  );
}

export default UserLink;
