import React from "react";
import { colors } from "../assets/colors";
import ButtonComment from "./buttonComment";
import ButtonLike from "./buttonLike";
import Button from "./button";
import Toolbar from "@material-ui/core/Toolbar";

const image1 = {
  src:
    "https://i1.wp.com/koomeministries.com/wp-content/uploads/2019/06/profile-placeholder-female.png?fit=250%2C350&ssl=1",
  alt: "female",
  width: "162px"
};

const image2 = {
  src:
    "https://149354401.v2.pressablecdn.com/wp-content/uploads/2018/01/placeholder-male-150x150.jpg",
  alt: "male",
  width: "162px"
};
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const name = "Anonim";

const date = "5 minutes ago";

const postStyle = {
  backgroundColor: colors.AWS_whiteish,
  borderRadius: "4px",
  margin: "40px",
  paddingLeft: "20px",
  paddingTop: "3px",
  paddingBottom: "75px",
  paddingRight: "20px",
  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
};

const imageStyle = {
  textAlign: "center"
};

const timeAndNameStyle = {
  lineHeight: "5px",
  marginBottom: "30px"
};

const outerButtonsStyle = {
  float: "right"
};

function Post() {
  return (
    <div style={postStyle}>
      <p style={timeAndNameStyle}>
        <h3>{name}</h3>
        <p>{date}</p>
      </p>
      <div style={imageStyle}>
        <img src={image1.src} alt={image1.alt} width={image1.width} />
        <img
          src={image2.src}
          alt={image2.alt}
          width={image2.width}
          hspace="30"
        />
      </div>
      <p>{text}</p>
      <div>
        <Toolbar style={outerButtonsStyle}>
          <ButtonLike />
          <ButtonComment />
        </Toolbar>
      </div>
    </div>
  );
}
export default Post;
