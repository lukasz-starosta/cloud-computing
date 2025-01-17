import React, { useEffect, useState } from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import CakeIcon from '@material-ui/icons/Cake';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import database from '../api/database';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import storage from '../api/storage';
import { DatePicker } from '@material-ui/pickers';
import { withAuthenticator } from '../components/authenticator-hoc';

const useStyles = makeStyles({
  profileBg: {
    backgroundColor: '#4d1d2c',
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
  followButton: {
    padding: '8px 30px',
    borderRadius: 12,
    outline: 'none',
    border: '2px solid #4d1d2c',
    background: 'transparent',
    fontWeight: 'bold',
    cursor: 'pointer',

    '&:hover': {
      background: '#4d1d2c',
      color: 'white'
    },
    '&:active': {
      background: '#4d1d2c',
      color: 'white',
      transform: 'scale(0.96)'
    },
    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none'
    },

    transition: 'all 0.3s ease-out'
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
  const [isEditNameWindowOpen, setIsEditNameWindowOpen] = useState(false);
  const [isEditDateWindowOpen, setIsEditDateWindowOpen] = useState(false);
  const [isEditProfilePictureWindowOpen, setIsEditProfilePictureWindowOpen] = useState(false);
  const [isEditBackgroundPictureWindowOpen, setIsEditBackgroundPictureWindowOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [data, setData] = useState({});
  const [profilePicture, setProfilePicture] = useState();
  const [backgroundPicture, setBackgroundPicture] = useState();
  const [isFollowedByCurrentUser, setIsFollowedByCurrentUser] = useState(false);
  const [isFollowSubmitting, setIsFollowSubmitting] = useState(false);

  const handleClickOpenName = () => {
    setIsEditNameWindowOpen(true);
  };

  const handleCloseName = () => {
    setIsEditNameWindowOpen(false);
  };

  const handleClickOpenDate = () => {
    setIsEditDateWindowOpen(true);
  };

  const handleCloseDate = () => {
    setIsEditDateWindowOpen(false);
  };

  const handleClickOpenProfilePicture = () => {
    if (!isCurrentUsersProfile) return;
    setIsEditProfilePictureWindowOpen(true);
  };

  const handleCloseProfilePicture = () => {
    setIsEditProfilePictureWindowOpen(false);
    setProfilePicture(null);
  };

  const handleClickOpenBackgroundPicture = () => {
    if (!isCurrentUsersProfile) return;
    setIsEditBackgroundPictureWindowOpen(true);
  };

  const handleCloseBackgroundPicture = () => {
    setIsEditBackgroundPictureWindowOpen(false);
    setBackgroundPicture(null);
  };

  const handleUpdateBackgroundPicture = () => {
    const updateBackgroundPicture = async (userId, backgroundPicture) => {
      setLoading(true);
      if (backgroundPicture && backgroundPicture.length > 0) {
        const url = await storage.upload(backgroundPicture[0]);
        await database.updateUser(userId, { backgroundPicture: url });
      }
      await fetchUser();
      handleCloseBackgroundPicture();
      setLoading(false);
    };

    updateBackgroundPicture(currentUser.uid, backgroundPicture);
  };

  const handleUpdateProfilePicture = () => {
    const updateProfilePicture = async (userId, profilePicture) => {
      setLoading(true);
      if (profilePicture && profilePicture.length > 0) {
        const url = await storage.upload(profilePicture[0]);
        await database.updateUser(userId, { profilePicture: url });
      }
      await fetchUser();
      handleCloseProfilePicture();
      setLoading(false);
    };
    updateProfilePicture(currentUser.uid, profilePicture);
  };

  const handleUpdateData = () => {
    const updateData = async (userId, data) => {
      await database.updateUser(userId, { ...data });
    };

    updateData(currentUser.uid, data);
    handleCloseName();
    handleCloseDate();
    fetchUser();
  };

  const userId = match.params.id;
  const isCurrentUsersProfile = currentUser.uid === userId;

  if (!userId) {
    if (currentUser) {
      history.push(`/profile/${currentUser.uid}`);
    } else {
      history.push('/login');
    }
  }

  async function fetchUser() {
    const userQuery = await database.getUser(userId);
    setUser(userQuery.data());
    setData({
      birthDate: userQuery.data().birthDate.toDate(),
      name: userQuery.data().name,
      surname: userQuery.data().surname
    });
  }

  useEffect(() => {
    async function fetchPosts() {
      const postQuery = await database.getPosts();
      setPosts(postQuery);
    }

    async function fetchFollowedByCurrentUser() {
      setIsFollowedByCurrentUser(
        await database.getIsFollowedByCurrentUser(currentUser.uid, userId)
      );
    }

    if (userId) {
      fetchUser();
      fetchFollowedByCurrentUser();
      fetchPosts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.uid, userId]);

  const handleFollowButtonClick = async () => {
    setIsFollowSubmitting(true);
    if (isFollowedByCurrentUser) {
      await database.unfollowUser(currentUser.uid, userId);
    } else {
      await database.followUser(currentUser.uid, userId);
    }
    setIsFollowedByCurrentUser(await database.getIsFollowedByCurrentUser(currentUser.uid, userId));
    setIsFollowSubmitting(false);
  };

  if (!user || !posts) return <></>;

  return (
    <div className={classes.profile}>
      <ProfilePicture
        onClickProfilePicture={handleClickOpenProfilePicture}
        onClickBackgroundPicture={handleClickOpenBackgroundPicture}
        profilePicture={user.profilePicture}
        backgroundPicture={user.backgroundPicture}
      />
      <Dialog
        open={isEditProfilePictureWindowOpen}
        onClose={handleCloseProfilePicture}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change profile picture</DialogTitle>
        <DialogContent>
          <DialogContentText>Please upload new profile picture:</DialogContentText>
          <input
            autoFocus
            margin="dense"
            id="profilePicture"
            label="Profile picture"
            type="file"
            accept="image/*"
            onChange={event => {
              setProfilePicture(event.target.files);
            }}
          />
          {loading && <p>Wait a second, the window will close automatically...</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfilePicture} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProfilePicture} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isEditBackgroundPictureWindowOpen}
        onClose={handleCloseBackgroundPicture}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change background picture</DialogTitle>
        <DialogContent>
          <DialogContentText>Please upload new background picture:</DialogContentText>
          <input
            autoFocus
            margin="dense"
            id="backgroundPicture"
            label="Background picture"
            type="file"
            accept="image/*"
            onChange={event => {
              setBackgroundPicture(event.target.files);
            }}
          />
          {loading && <p>Wait a second, the window will close automatically...</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBackgroundPicture} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateBackgroundPicture} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <button
        onClick={handleFollowButtonClick}
        className={classes.followButton}
        disabled={currentUser.uid === userId || isFollowSubmitting}
      >
        {isFollowedByCurrentUser ? 'Unfollow' : 'Follow'}
      </button>
      <NameAndSurname
        name={user.name}
        surname={user.surname}
        isCurrentUsersProfile={isCurrentUsersProfile}
        editIcon={
          <EditIcon
            style={{ verticalAlign: 'bottom', cursor: 'pointer' }}
            onClick={handleClickOpenName}
          />
        }
      />
      <Dialog
        open={isEditNameWindowOpen}
        onClose={handleCloseName}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change name and surname</DialogTitle>
        <DialogContent>
          <DialogContentText>Please insert new name and surname:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="string"
            value={data.name}
            fullWidth
            onChange={event => {
              event.persist();
              setData(rest => {
                return { ...rest, name: event.target.value };
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="surname"
            label="Surname"
            type="string"
            value={data.surname}
            fullWidth
            onChange={event => {
              event.persist();
              setData(rest => {
                return { ...rest, surname: event.target.value };
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseName} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateData} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Info
        cakeIcon={<CakeIcon style={{ verticalAlign: 'bottom' }} />}
        text={new Date(user.birthDate.seconds * 1000).toDateString()}
        isCurrentUsersProfile={isCurrentUsersProfile}
        editIcon={<EditIcon style={{ verticalAlign: 'bottom' }} onClick={handleClickOpenDate} />}
      ></Info>
      <Dialog
        open={isEditDateWindowOpen}
        onClose={handleCloseDate}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change birth date</DialogTitle>
        <DialogContent>
          <DialogContentText>Please insert new birth date:</DialogContentText>
          <DatePicker
            required
            variant="inline"
            inputVariant="outlined"
            label="Birth date"
            value={data.birthDate}
            onChange={date => {
              setData(rest => {
                return { ...rest, birthDate: date };
              });
            }}
            format="MM/dd/yyyy"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDate} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateData} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" component="h3" color="textSecondary" align="center" justify="center">
        My posts
      </Typography>

      <div>
        {posts
          .filter(item => item.userUid === userId)
          .map(item => (
            <Post
              key={item.post.id}
              text={item.post.content}
              date={new Date(item.post.created_at.seconds * 1000).toDateString()}
              time={new Date(item.post.created_at.seconds * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
              image={
                item.post.image && (
                  <div style={{ textAlign: 'center' }}>
                    <img src={item.post.image} alt="post pick" width={300} />
                  </div>
                )
              }
            />
          ))}
      </div>
    </div>
  );
}

function ProfilePicture(props) {
  const classes = useStyles();
  const {
    onClickProfilePicture,
    onClickBackgroundPicture,
    profilePicture,
    backgroundPicture
  } = props;
  return (
    <>
      <Box
        className={classes.profileBg}
        style={{ backgroundImage: `url(${backgroundPicture})` }}
        onClick={onClickBackgroundPicture}
      />
      <Avatar className={classes.bigAvatar} src={profilePicture} onClick={onClickProfilePicture} />
    </>
  );
}

function NameAndSurname(props) {
  const { name, surname, editIcon, isCurrentUsersProfile } = props;

  return (
    <h3>
      {name} {surname}
      {isCurrentUsersProfile ? editIcon : <></>}
    </h3>
  );
}

function Info(props) {
  const { editIcon, cakeIcon, text, isCurrentUsersProfile } = props;
  return (
    <div>
      {cakeIcon}
      {text}
      {isCurrentUsersProfile ? editIcon : <></>}
    </div>
  );
}

function Post(props) {
  const { text, date, image, time } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid>
        <Paper className={classes.post}>
          <Typography variant="caption" component="p" align="right">
            {date}
          </Typography>
          <Typography variant="caption" component="p" align="right">
            {time}
          </Typography>
          {image}
          <Typography component="p">{text}</Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default withAuthenticator(Profile);
