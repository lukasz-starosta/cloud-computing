import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { colors } from '../assets/colors';
import Fab from '@material-ui/core/Fab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import database from '../api/database';


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
  button: {
    marginTop: '10px',
    alignSelf: 'flex-end'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const NewPost = ({ user, fetchPosts }) => {
  const [post, setPost] = useState({ content: '' });

  const classes = useStyles();

  const handleAddPost = () => {
    const createPost = async (userUid, post) => {
      await database.setPost(userUid, post);
    };

    createPost(user.uid, post).then(() => {
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
          rowsMax='4'
          value={post.content}
          onChange={event => {
            event.persist();
            setPost({
              content: event.target.value
            });
          }}
          variant='outlined'
        />
        <div className={classes.button}>
          <Fab color='primary' variant='extended' onClick={handleAddPost}>
            <PostAddIcon className={classes.extendedIcon} />
            Add Post
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
