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
import PlaceIcon from '@material-ui/icons/Place';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles({
  profileBg: {
    backgroundColor: '#4d1d2c',
    backgroundImage: `url(${'http://justfunfacts.com/wp-content/uploads/2018/03/mountains.jpg'})`,
    backgroundSize: 'cover',
    height: 250,
    marginLeft: -32,
    marginRight: -32
  },
  profile: {
    paddingBottom: 20,
    marginBottom: 30
  },
  bigAvatar: {
    width: 200,
    height: 200,
    margin: 10,
    marginLeft: 40,
    marginTop: -100,
    border: 'solid',
    borderWidth: 5,
    borderColor: '#FFF'
  },
  post: {
    marginBottom: 10,
    padding: 20
  },
  textField: {
    width: 600
  },

  addPost: {
    marginTop: 30,
    marginBottom: 30
  }
});

function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <ProfilePicture />

      <NameAndSurname name="Iga" surname="Wójcik" />

      <Info
        icon={<CakeIcon style={{ verticalAlign: 'bottom' }} />}
        text=" 11.06.1999"
      ></Info>

      <Typography
        variant="h4"
        component="h3"
        color="textSecondary"
        align="center"
        justify="center"
      >
        My posts
      </Typography>

      <NewPost></NewPost>

      <Post title="A dzisiaj" text="czuje sie  swietnie :)" date="22.11.19" />
      <Post title="Dzisiaj" text="czuje sie słabo :(" date="21.11.19" />
    </div>
  );
}

function ProfilePicture() {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.profileBg}></Box>
      <Avatar
        className={classes.bigAvatar}
        src='https://image.shutterstock.com/image-vector/female-profile-picture-placeholder-vector-260nw-450966889.jpg'
      />
    </>
  );
}

function NameAndSurname(props) {
  const { name, surname } = props;

  return (
    <h3>
      {name} {surname}
    </h3>
  );
}

function Info(props) {
  const { icon, text } = props;
  return (
    <div>
      {icon}
      {text}
    </div>
  );
}

function NewPost() {
  const classes = useStyles();
  return (
    <Box className={classes.addPost} borderColor="#4a4949">
      <Grid
        container
        spacing={5}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={8}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="New Post"
            variant="outlined"
            width="auto"
          />
        </Grid>
        <Grid item xs={4}>
          <Fab color="primary" variant="extended" aria-label="Add">
            <AddIcon className={classes.extendedIcon} />
            Post
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
}

function Post(props) {
  const { title, text, date } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid>
        <Paper className={classes.post}>
          <Box display='flex' p={1} bgcolor='background.paper'>
            <Box p={1} flexGrow={1}>
              <Typography variant='h5' component='h3'>
                {title}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography component='span'>{date}</Typography>
            </Box>
          </Box>

          <Typography component='p'>{text}</Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default Profile;
