import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { colors } from '../../assets/colors';
import firebase from 'firebase';
import UserSearch from '../user-search';
import clsx from 'clsx';
import logoBig from '../../assets/images/logo_big.png';
import logoSmall from '../../assets/images/logo2.png';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: colors.AWS_blue,
    display: 'flex',
    alignItems: 'center'
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    margin: '0 12px',
    cursor: 'pointer'
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
  dashboard: {
    marginLeft: 50
  },
  toolbar: {
    width: '100%',
    display: 'flex'
  },
  logo: {
    position: 'absolute',
    left: 20
  },
  logoImg: {
    width: 32,
    marginTop: 2
  }
});

function Navbar({ isLoggedIn }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Link className={clsx(classes.link, classes.logo)} to="/">
          <img className={classes.logoImg} src={logoSmall} alt="logo" />
        </Link>
        <Link className={clsx(classes.link, classes.dashboard)} to="/dashboard">
          Dashboard
        </Link>
        <Link className={classes.link} to="/about">
          About
        </Link>
        <UserSearch />
        <Link className={classes.link} to="/profile">
          Profile
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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
