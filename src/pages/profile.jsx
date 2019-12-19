import React, { useEffect, useState } from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import CakeIcon from '@material-ui/icons/Cake';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import database from '../api/database';

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

function Profile(props) {
  const { currentUser, match, history } = props;
  const classes = useStyles();

  const userId = match.params.id;

  if (!userId) {
    if (currentUser) {
      history.push(`/profile/${currentUser.uid}`);
    } else {
      history.push('/login');
    }
  }

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const userQuery = await database.getUser(userId);

      var userdata = userQuery.data();
      setUser(userQuery.data());
    }

    async function fetchPosts() {
      const postQuery = await database.getPosts(userId);
      console.log('postQuery', postQuery);
      setPosts(postQuery);
    }

    fetchUser();
    fetchPosts();
  }, []);

  if (!user) return <></>;
  if (!posts) return <></>;

  // console.log(user);

  return (
    <div className={classes.profile}>
      <ProfilePicture />
      <NameAndSurname name={user.name} surname={user.surname} />
      <Info
        icon={<CakeIcon style={{ verticalAlign: 'bottom' }} />}
        text={new Date(user.birthDate.seconds * 1000).toDateString()}
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

      <div>
        {posts.map(item => (
          <Post
            text={item.post.content}
            date={new Date(item.post.content.seconds).toString()}
          />
        ))}
      </div>
      {/* ReactDOM.render(){RenderPosts(userId)}; */}
    </div>
  );
}

// function RenderPosts(props) {
//   const { user } = props;

//   const postsData = database.getPosts(user);

//   if (postsData) {
//     var components = [];
//     var posts = [];
//     const request = async () => {
//       await postsData.then(list => {
//         for (var i = 0; i < list.length; i++) {
//         }
//       });
//     };
//     request();

//     return null;
//   } else {
//     console.log('else');
//     return null;
//   }
// }

function ProfilePicture() {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.profileBg}></Box>
      <Avatar
        className={classes.bigAvatar}
        src="https://image.shutterstock.com/image-vector/female-profile-picture-placeholder-vector-260nw-450966889.jpg"
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
  const { text, date } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid>
        <Paper className={classes.post}>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Box p={1} flexGrow={1}>
              <Typography variant="h5" component="h3"></Typography>
            </Box>
            <Box p={1}>
              <Typography component="span">{date}</Typography>
            </Box>
          </Box>

          <Typography component="p">{text}</Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default Profile;
