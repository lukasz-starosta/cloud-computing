import React from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import CakeIcon from '@material-ui/icons/Cake';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { borderRight } from '@material-ui/system';
import red from '@material-ui/core/colors/red';
        

const useStyles = makeStyles({
    profileBg: {
        border: "solid",
        borderWidth: 10,
        borderColor: "#4d1d2c",
        backgroundColor: "#4d1d2c",
        backgroundImage: `url(${"http://justfunfacts.com/wp-content/uploads/2018/03/mountains.jpg"})`,
        backgroundSize: "cover",
        height: 250,
    },
    profile: {
        paddingBottom: 20,
        marginBottom: 30,
    },
    bigAvatar: {
        width: 200,
        height: 200,
        margin: 10,
        marginLeft: 40,
        marginTop: -100,
        border: "solid",
        borderWidth: 5,
        borderColor: "#FFF",
    },
    post: {
        marginBottom: 30,
        padding: 20,
    },
    textField: {
        width: 600,
    },

    addPost: {
        marginBottom: 30,
    },



});

function Profile() {
    const classes = useStyles();

    return <div className={classes.profile}>
       
        <ProfilePicture/>
      
        <NameAndSurname
            name="Iga"
            surname="Wójcik"
        />
        <BirthDate
            date="34.13.208"
        />
        <NewPost></NewPost>



        <Post
            title="dzisiaj"
            text="czuje sie dzisiaj swietnie :)"
            date="11.20.19"
        />
        <Post
            title="A dzisiaj"
            text="czuje sie dzisiaj chujowo :("
            date="10.20.19"
        />






    </div>;

}

function ProfilePicture() {
    const classes = useStyles();

    return <>
    <Box className={classes.profileBg}>

    </Box>
    <Avatar className={classes.bigAvatar} src="https://image.shutterstock.com/image-vector/female-profile-picture-placeholder-vector-260nw-450966889.jpg" />
    </>
}

function NameAndSurname(props) {

    const { name, surname } = props;


    return <h3>{name} {surname}</h3>;
}

function BirthDate(props) {
    const { date } = props;

    return <p><CakeIcon /> {date}</p>;
}


function NewPost() {
    const classes = useStyles();
    return <Box className={classes.addPost} borderTop={1}>
        <Grid
            container
            spacing={5}
            direction="column"
            alignItems="center"
            justify="center"

        >

            <Grid item xs={3}  >
                <Typography variant="h5" component="h3" >
                    My posts
                        </Typography>
            </Grid>

            <Grid
                container
                spacing={5}
                direction="row"
                alignItems="center"
                justify="center"
                justifyContent="center"
            >
                <Grid item xs={8} >
                    <TextField
                        id="outlined-basic"
                        className={classes.textField}
                        label="New Post"
                        variant="outlined"
                        width="auto"
                    />
                </Grid>
                <Grid item xs={4} marginLeft="3" >
                    <Fab color="primary" variant="extended" aria-label="Add" >
                        <AddIcon className={classes.extendedIcon} />
                        Post
                </Fab>
                </Grid>


            </Grid>
        </Grid>



    </Box>
}


function Post(props) {
    const { title, text, date } = props;
    const classes = useStyles();

    return <div>

        <Grid>
            <Paper className={classes.post}>

                <Box display="flex" p={1} bgcolor="background.paper">
                    <Box p={1} flexGrow={1} >
                        <Typography variant="h5" component="h3">
                            {title}
                        </Typography>
                    </Box>
                    <Box p={1} >
                        <Typography component="span" >
                            {date}
                        </Typography>
                    </Box>
                </Box>

                <Typography component="p">
                    {text}
                </Typography>

            </Paper>
        </Grid>
    </div>

}

export default Profile;
