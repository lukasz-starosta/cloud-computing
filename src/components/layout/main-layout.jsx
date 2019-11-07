import React from 'react';
import Navbar from './navbar';
import { Container, makeStyles } from '@material-ui/core';
import { colors } from '../../assets/colors';

const useStyles = makeStyles({
    container: {
        backgroundColor: colors.AWS_lightGrey,
        height: 'calc(100vh + 100px)',
        marginTop: '-100px',
        paddingTop: '120px'
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
