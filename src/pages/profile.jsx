import React, { useEffect, useState } from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import CakeIcon from '@material-ui/icons/Cake';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import database from '../api/database';
import { withAuthenticator } from '../components/authenticator-hoc'

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
    marginTop: 10,
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
      setUser(userQuery.data());
    }

    async function fetchPosts() {
      const postQuery = await database.getPosts(userId);
      setPosts(postQuery);
    }

    if (userId) {
      fetchUser();
      fetchPosts();
    }
  }, [userId]);

  if (!user || !posts) return <></>;

  return (
    <div className={classes.profile}>
      <ProfilePicture />
      <NameAndSurname name={user.name} surname={user.surname} />
      <Info
        icon={<CakeIcon style={{ verticalAlign: 'bottom' }} />}
        text={new Date(user.birthDate.seconds * 1000).toDateString()}
      ></Info>
      <Typography
        variant='h4'
        component='h3'
        color='textSecondary'
        align='center'
        justify='center'
      >
        My posts
      </Typography>

      <div>
        {posts.map(item => (
          <Post
            key={item.post.id}
            text={item.post.content}
            date={new Date(item.post.content.seconds).toString()}
            image={
              item.post.image && (
                <div style={{ textAlign: 'center' }}>
                  <img src={item.post.image} alt='post pick' width={300} />
                </div>
              )
            }
          />
        ))}
      </div>
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

function Post(props) {
  const { text, date, image } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid>
        <Paper className={classes.post}>
          <Typography variant='caption' component='p' align='right'>
            {date}
          </Typography>
          {image}
          <Typography component='p'>{text}</Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default withAuthenticator(Profile);
