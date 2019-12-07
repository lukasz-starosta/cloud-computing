import React from 'react';
import { colors } from '../assets/colors';
import Toolbar from '@material-ui/core/Toolbar';
import FloatingActionButton from './floating-action-button';
import { Typography, makeStyles } from '@material-ui/core';
import UserLink from './user-link';

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

const useStyles = makeStyles({
  username: {
    marginTop: 8,
    color: '#565656',
    '&:hover': {
      color: '#9a9a9a'
    }
  }
});

const postStyle = {
  backgroundColor: colors.AWS_whiteish,
  borderRadius: '4px',
  margin: '40px',
  paddingLeft: '20px',
  paddingTop: '3px',
  paddingBottom: '75px',
  paddingRight: '20px',
  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
};

const imageStyle = {
  textAlign: 'center'
};

const timeAndNameStyle = {
  lineHeight: '5px',
  marginBottom: '30px'
};

const outerButtonsStyle = {
  float: 'right',
  paddingRight: 0
};

// TODO: Refactor styles
function Post(props) {
  const { user, post } = props;
  const { content, created_at } = post;

  const classes = useStyles();

  if (!user || !post) return null;

  return (
    <div style={postStyle}>
      <div style={timeAndNameStyle}>
        <Typography variant="h5" className={classes.username}>
          <UserLink userUid={user.userUid} username={user.username} />
        </Typography>
        {/* epoch * 1000 to properly convert to date */}
        <p>{new Date(created_at.seconds * 1000).toUTCString()}</p>
      </div>
      <div style={imageStyle}>
        <img src={image1.src} alt={image1.alt} width={image1.width} />
        <img src={image2.src} alt={image2.alt} width={image2.width} hspace="30" />
      </div>
      <p>{content}</p>
      <div>
        <Toolbar style={outerButtonsStyle}>
          <FloatingActionButton isLikeIcon color="secondary" />
          <FloatingActionButton color="primary" />
        </Toolbar>
      </div>
    </div>
  );
}
export default Post;
