import React, { useEffect, useState } from 'react';
import { colors } from '../assets/colors';
import Toolbar from '@material-ui/core/Toolbar';
import FloatingActionButton from './floating-action-button';
import TextField from '@material-ui/core/TextField';
import { Typography, makeStyles } from '@material-ui/core';
import UserLink from './user-link';
import database from '../api/database';
import Comment from '../components/comment';
import grey from '@material-ui/core/colors/grey';

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

const imageStyle = {
  textAlign: 'center'
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
  },
  username: {
    marginTop: 8,
    color: '#565656',
    '&:hover': {
      color: '#9a9a9a'
    }
  }
}));

function Post(props) {
  const { user, post, currentUser } = props;
  const { content, created_at } = post;
  const classes = useStyles();

  const [likes, setLike] = useState(null);
  const [comment, setComment] = useState({ commentContent: '' });
  const [comments, setComments] = useState(null);
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);
  const [buttonColor, setButtonColor] = useState(null);
  const [likeButtonIsDisabled, setLikeButtonIsDisabled] = useState(false);
  const [commentButtonIsDisabled, setCommentButtonIsDisabled] = useState(false);
  const [countLikes, setCountLikes] = useState(0);

  async function fetchLikes() {
    const likes = await database.getLikes(post.id);
    setCountLikes(likes.length);
    setLike(likes);
    const isLiked = !!likes.find(like => currentUser.uid === like.userId);
    setIsLikedByCurrentUser(isLiked);
    if (isLiked) setButtonColor('secondary');
    else setButtonColor(grey[50]);
  }

  async function fetchComments() {
    const comments = await database.getComments(post.id);
    setComments(comments);
  }

  useEffect(() => {
    fetchComments();
    fetchLikes();
  }, []);

  async function handleLikeClick() {
    setLikeButtonIsDisabled(true);
    const newLiked = !isLikedByCurrentUser;
    setIsLikedByCurrentUser(newLiked);
    if (newLiked) {
      setCountLikes(countLikes + 1);
      await database.setLike(currentUser.uid, post.id);
    } else {
      setCountLikes(countLikes - 1);
      await database.deleteLike(currentUser.uid, post.id);
    }
    await fetchLikes();
    setLikeButtonIsDisabled(false);
  }

  async function handleAddComment() {
    if (comment.commentContent != '') {
      setCommentButtonIsDisabled(true);
      const addComment = async (postId, userId, comment) => {
        await database.setComment(postId, userId, comment.commentContent);
      };

      addComment(post.id, currentUser.uid, comment).then(() => {
        fetchComments();
        setComment({ commentContent: '' });
      });
      setCommentButtonIsDisabled(false);
    }
  }

  if (!user || !post) return null;

  return (
    <div className={classes.postStyle}>
      <div className={classes.timeAndNameStyle}>
        <Typography variant="h5" className={classes.username}>
          <UserLink userUid={user.userUid} username={user.username} />
        </Typography>
        {/* epoch * 1000 to properly convert to date */}
        <p>{new Date(created_at.seconds * 1000).toUTCString()}</p>
      </div>
      {post.image && (
        <div style={imageStyle}>
          <img src={post.image} alt="post pick" width={300} />
        </div>
      )}
      <p>{content}</p>
      {comments &&
        comments.map(currentComment => (
          <Comment
            key={currentComment.commentId}
            username={`${currentUser.name}  ${currentUser.surname}`}
            content={currentComment.content}
            time={new Date(
              currentComment.created_at.seconds * 1000
            ).toUTCString()}
          />
        ))}
      <div>
        <form className={classes.comment} noValidate autoComplete="off">
          <TextField
            id="outlined-multiline-flexible"
            label="Write a comment"
            multiline
            rowsMax="3"
            variant="outlined"
            value={comment.commentContent}
            onChange={event => {
              event.persist();
              setComment({
                commentContent: event.target.value
              });
            }}
          />
        </form>
        Likes: {countLikes}
      </div>
      <div>
        <Toolbar className={classes.outerButtonsStyle}>
          <FloatingActionButton
            isDisabled={likeButtonIsDisabled}
            isLikeIcon
            color={buttonColor}
            click={handleLikeClick}
          />
          <FloatingActionButton
            isDisabled={commentButtonIsDisabled}
            color="primary"
            addComment={handleAddComment}
          />
        </Toolbar>
      </div>
    </div>
  );
}
export default Post;
