import React, { useEffect, useState } from 'react';
import { colors } from '../assets/colors';
import Toolbar from '@material-ui/core/Toolbar';
import FloatingActionButton from './floating-action-button';
import TextField from '@material-ui/core/TextField';
import { Typography, makeStyles } from '@material-ui/core';
import UserLink from './user-link';
import database from '../api/database';
import Comment from '../components/comment';

const image1 = {
  src:
    'https://i1.wp.com/koomeministries.com/wp-content/uploads/2019/06/profile-placeholder-female.png?fit=250%2C350&ssl=1',
  alt: 'female',
  width: '162px'
};

const image2 = {
  src:
    'https://149354401.v2.pressablecdn.com/wp-content/uploads/2018/01/placeholder-male-150x150.jpg',
  alt: 'male',
  width: '162px'
};

const useStyles = makeStyles(theme => ({
  postStyle: {
    backgroundColor: colors.AWS_whiteish,
    borderRadius: '4px',
    margin: '40px',
    paddingLeft: '20px',
    paddingTop: '3px',
    paddingBottom: '75px',
    paddingRight: '20px',
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
  },
  imageStyle: {
    textAlign: 'center'
  },
  timeAndNameStyle: {
    lineHeight: '5px',
    marginBottom: '30px'
  },
  outerButtonStyle: {
    float: 'right',
    paddingRight: 0
  },
  comment: {
    '& > *': {
      margin: theme.spacing(1),
      width: 600
    }
  }
}));

// TODO: Refactor styles
function Post(props) {
  const { user, post, currentUser } = props;
  const { content, created_at } = post;
  const classes = useStyles();

  const [likes, setLike] = useState(null);
  const [comments, setComment] = useState(null);
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);
  var countLikes;

  async function fetchLikes() {
    const likes = await database.getLikes(post.id);
    setLike(likes);
    const isLiked = likes.find(like => currentUser.uid === like.userId);
    setIsLikedByCurrentUser(isLiked);
  }

  useEffect(() => {
    fetchComments();
    fetchLikes();
  }, []);

  // na button
  const handleClick = () => setIsLikedByCurrentUser(!isLikedByCurrentUser);
  useEffect(() => {
    if (isLikedByCurrentUser) database.deleteLike(currentUser.uid, post.id);
    else database.setLike(currentUser.uid, post.id);
  }, [isLikedByCurrentUser]);

  async function fetchComments() {
    setComment(await database.getComments(post.id));
  }

  const handleAddComment = () => {
    const addComment = async (userId, postId, content) => {
      await database.setComment(userId, postId, content);
    };

    addComment(currentUser.uid, post.id, content).then(() => {
      fetchComments();
      setComment({ content: '' });
    });
  };

  const handleAddDeleteLike = () => {
    const handleLike = async (userId, postId) => {
      await database.setLike(userId, postId);
    };

    handleLike(currentUser.uid, post.id).then(() => {
      fetchLikes();
    });
  };

  if (!user || !post) return null;

  if (!likes) countLikes = 0;
  else countLikes = likes.length; //likes.length;

  return (
    <div className={classes.postStyle}>
      <div className={classes.timeAndNameStyle}>
        <Typography variant="h5" className={classes.username}>
          <UserLink userUid={user.userUid} username={user.username} />
        </Typography>
        {/* epoch * 1000 to properly convert to date */}
        <p>{new Date(created_at.seconds * 1000).toUTCString()}</p>
      </div>
      <div className={classes.imageStyle}>
        <img src={image1.src} alt={image1.alt} width={image1.width} />
        <img
          src={image2.src}
          alt={image2.alt}
          width={image2.width}
          hspace="30"
        />
      </div>
      <p>{content}</p>
      {comments &&
        comments.map(comment => (
          <Comment
            key={comment.commentId}
            username={`${currentUser.name}  ${currentUser.surname}`}
            content={comment.content}
          />
        ))}
      {/*<Comment username="Wuja" content={post.id} />*/}
      <div>
        <form className={classes.comment} noValidate autoComplete="off">
          <TextField
            id="outlined-multiline-flexible"
            label="Write a comment"
            multiline
            rowsMax="3"
            variant="outlined"
            value=""
            onChange={event => {
              event.persist();
              setComment({
                content: event.target.value
              });
            }}
          />
        </form>
        {countLikes}
      </div>
      <div>
        <Toolbar className={classes.outerButtonsStyle}>
          <FloatingActionButton
            isLikeIcon
            color="secondary"
            addLike={handleAddDeleteLike}
            click={handleClick}
            //onClick={() => database.setLike(post.id, currentUser.uid)}
            /*postId={post.id}
              userId={currentUser.uid}*/
          />
          <FloatingActionButton color="primary" addComment={handleAddComment} />
        </Toolbar>
      </div>
    </div>
  );
}
export default Post;
