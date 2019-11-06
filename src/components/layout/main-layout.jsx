import React from 'react';
import Navbar from './navbar';
import { Container, makeStyles } from '@material-ui/core';
import { colors } from '../../assets/colors';

const useStyles = makeStyles({
    container: {
        backgroundColor: colors.AWS_lightGrey
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
