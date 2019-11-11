import React from "react";
import { colors } from "../assets/colors";

const image1 = {
  src:
    "https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-monkeyselfie.jpg",
  alt: "monkey",
  width: "200px"
};

const image2 = {
  src:
    "https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-owl.jpg",
  alt: "owl",
  width: "200px"
};
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const name = "Anonim";

const date = "5 minutes ago";

const postStyle = {
  backgroundColor: colors.AWS_greyBlue,
  // border: '2px solid #232f3e',
  margin: "40px",
  paddingLeft: "20px",
  paddingTop: "3px",
  paddingBottom: "3px",
  paddingRight: "20px"
};

const imageStyle = {
  textAlign: "center"
};

const timeAndNameStyle = {
  lineHeight: "5px",
  marginBottom: "30px"
};

function Post() {
  return (
    <div style={postStyle} onClick={() => alert("kliknales post")}>
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
    </div>
  );
}
export default Post;
