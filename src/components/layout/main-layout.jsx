import React from 'react';
import Navbar from './navbar';
import { Container, makeStyles } from '@material-ui/core';
import { colors } from '../../assets/colors';

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

  return (
    <>
      <Navbar />
      <Container className={classes.container} maxWidth="md">
        {children}
      </Container>
    </>
  );
}

export default MainLayout;
