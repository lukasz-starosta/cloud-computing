import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Container, makeStyles } from "@material-ui/core";
import { colors } from "../../assets/colors";
import firebase from "firebase";

const useStyles = makeStyles({
  container: {
    backgroundColor: colors.AWS_lightGrey,
    minHeight: 'calc(100vh + 64px)',
    marginTop: '48px',
    paddingTop: '16px',
    overflowY: 'auto'
  }
});

function MainLayout(props) {
  const { children } = props;
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsLoggedIn(user ? true : false);
      setLoading(false);
    });
  }, []);

  return (
    !loading && (
      <>
        <Navbar isLoggedIn={isLoggedIn} />
        <Container className={classes.container} maxWidth="md">
          {children}
        </Container>
      </>
    )
  );
}

export default MainLayout;
