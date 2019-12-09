import React from 'react';
import { colors } from '../assets/colors';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import FloatingActionButton from './floating-action-button';
import TextField from '@material-ui/core/TextField';

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

function Post(props) {
  const { username, post, key } = props;
  const { content, created_at } = post;
  const classes = useStyles();

  return (
    <div className={classes.postStyle}>
      <div className={classes.timeAndNameStyle}>
        <h3>{username}</h3>
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
      <div>
        <form className={classes.comment} noValidate autoComplete="off">
          <TextField
            id="outlined-multiline-flexible"
            label="Write a comment"
            multiline
            rowsMax="3"
            variant="outlined"
          />
        </form>
      </div>
      <div>
        <Toolbar className={classes.outerButtonsStyle}>
          <FloatingActionButton isLikeIcon color="secondary" />
          <FloatingActionButton color="primary" />
        </Toolbar>
        {likes}
      </div>
    </div>
  );
}
export default Post;
