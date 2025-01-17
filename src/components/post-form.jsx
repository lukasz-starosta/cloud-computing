import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { colors } from '../assets/colors';
import Fab from '@material-ui/core/Fab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import database from '../api/database';
import storage from '../api/storage';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 40px',
    padding: '20px',
    borderRadius: '4px',
    backgroundColor: colors.AWS_whiteish,
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
  },
  form: {
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iga: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: '10px',
    marginLeft: '5px'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },

  file: {}
}));

const NewPost = ({ currentUser, fetchPosts }) => {
  const [post, setPost] = useState({ content: '' });
  const [files, setFiles] = useState();

  const classes = useStyles();

  const handleAddPost = () => {
    const addPost = async (userUid, username, post) => {
      if (files && files.length > 0) {
        const url = await storage.upload(files[0]);
        await database.setPost(userUid, username, { ...post, image: url });
      } else {
        await database.setPost(userUid, username, post);
      }
    };

    addPost(currentUser.uid, currentUser.name, post).then(() => {
      fetchPosts();
      setPost({ content: '' });
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <TextField
          fullWidth={true}
          label="What's happening?"
          multiline
          rows='4'
          rowsMax='6'
          value={post.content}
          onChange={event => {
            event.persist();
            setPost({
              content: event.target.value
            });
          }}
          variant='outlined'
        />
        <div className={classes.iga}>
          <div className={classes.file}>
            <input
              type='file'
              accept='image/*'
              onChange={event => {
                setFiles(event.target.files);
              }}
            />
          </div>
          <div className={classes.button}>
            <Fab color='primary' variant='extended' onClick={handleAddPost}>
              <PostAddIcon className={classes.extendedIcon} />
              Add Post
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
