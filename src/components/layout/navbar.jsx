import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { colors } from '../../assets/colors';
import firebase from 'firebase';
import UserSearch from '../user-search';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: colors.AWS_blue,
    display: 'flex',
    alignItems: 'center'
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    margin: '0 12px'
  },
  logOut: {
    background: 'transparent',
    outline: 'none',
    border: 'none',
    color: 'white',
    fontSize: 16,
    fontFamily: 'inherit',
    padding: 0
  },
  toolbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
});

function Navbar({ isLoggedIn }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Link className={classes.link} to="/dashboard">
          Dashboard
        </Link>
        <Link className={classes.link} to="/profile">
          Profile
        </Link>
        <Link className={classes.link} to="/">
          Logo
        </Link>
        <Link className={classes.link} to="/about">
          About
        </Link>
        {!isLoggedIn ? (
          <Link className={classes.link} to="/login">
            Login
          </Link>
        ) : (
          <button
            className={classes.logOut}
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            <Link className={classes.link} to="/">
              Log out
            </Link>
          </button>
        )}
        <UserSearch />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
