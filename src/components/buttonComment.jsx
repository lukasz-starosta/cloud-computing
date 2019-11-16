// import React from "react";
// import { colors } from "../assets/colors";

// const buttonCommentStyle = {
//   backgroundColor: colors.AWS_greyBlue,
//   // backgroundColor: 'white',
//   borderRadius: "25px",
//   //border: '2px solid #232f3e';
//   boxShadow: "2px 2px 2px 2px #232f3e"
// };
// function ButtonComment() {
//   return (
//     <button
//       style={buttonCommentStyle}
//       onClick={() => alert("You commented on the post")}
//     >
//       Comment
//     </button>
//   );
// }

// export default ButtonComment;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();

  return (
    <div>
      <Fab color="primary" aria-label="add" className={classes.fab}>  
        <AddCommentIcon onClick={() => alert("You commented on the post")}/>
      </Fab>
    </div>
  );
}