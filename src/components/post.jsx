import React from 'react';
import { colors } from '../assets/colors';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

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
  float: 'right'
};

function Post(props) {
  const { username, post } = props;
  const { content, created_at } = post;

  return (
    <div style={postStyle}>
      <div style={timeAndNameStyle}>
        <h3>{username}</h3>
        {/* epoch * 1000 to properly convert to date */}
        <p>{new Date(created_at.seconds * 1000).toUTCString()}</p>
      </div>
      <div style={imageStyle}>
        <img src={image1.src} alt={image1.alt} width={image1.width} />
        <img
          src={image2.src}
          alt={image2.alt}
          width={image2.width}
          hspace='30'
        />
      </div>
      <p>{content}</p>
      <div>
        <Toolbar style={outerButtonsStyle}>
          <Button isLikeIcon={true} color='secondary' />
          <Button isLikeIcon={false} color='primary' />
        </Toolbar>
      </div>
    </div>
  );
}
export default Post;
