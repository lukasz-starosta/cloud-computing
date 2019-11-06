import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { colors } from '../../assets/colors';

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
    }
});

function Navbar() {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar variant="dense">
                <Link className={classes.link} to="/">
                    Dashboard
                </Link>
                <Link className={classes.link} to="/login">
                    Login
                </Link>
                <Link className={classes.link} to="/profile">
                    Profile
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
