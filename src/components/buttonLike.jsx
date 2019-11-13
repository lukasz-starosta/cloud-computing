import React from "react";
import { colors } from "../assets/colors";

const buttonLikeStyle = {
  margin: "10px",
  backgroundColor: colors.AWS_greyBlue,
  // backgroundColor: 'white',
  borderRadius: "25px",
  //border: '2px solid #232f3e';
  boxShadow: "2px 2px 2px 2px #232f3e"
};
function ButtonLike() {
  return (
    <button style={buttonLikeStyle} onClick={() => alert("you liked the post")}>
      Like
    </button>
  );
}

export default ButtonLike;
