import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { Container, makeStyles } from '@material-ui/core';
import { colors } from '../../assets/colors';
import firebase from 'firebase';
import database from '../../api/database';

const useStyles = makeStyles({
  container: {
    backgroundColor: colors.AWS_lightGrey,
    minHeight: 'calc(100vh + 64px)',
    marginTop: '48px',
    paddingTop: '16px',
    overflowY: 'auto'
  }
});

function AppComponent(props) {
  const { children } = props;
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async uid => {
      return await database.getUser(uid);
    };

    firebase.auth().onAuthStateChanged(user => {
      setIsLoggedIn(user ? true : false);

      if (user) {
        getUser(user.uid).then(doc => {
          if (doc.exists) {
            setUser({ ...doc.data(), uid: user.uid });
          }
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });
  }, []);

  return (
    !loading && (
      <>
        <Navbar isLoggedIn={isLoggedIn} />
        <Container className={classes.container} maxWidth='md'>
          {children(user)}
        </Container>
      </>
    )
  );
}

export default AppComponent;
