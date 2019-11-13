import React from "react";
import { colors } from "../assets/colors";

const buttonCommentStyle = {
  backgroundColor: colors.AWS_greyBlue,
  // backgroundColor: 'white',
  borderRadius: "25px",
  //border: '2px solid #232f3e';
  boxShadow: "2px 2px 2px 2px #232f3e"
};
function ButtonComment() {
  return (
    <button
      style={buttonCommentStyle}
      onClick={() => alert("You commented on the post")}
    >
      Comment
    </button>
  );
}

export default ButtonComment;
