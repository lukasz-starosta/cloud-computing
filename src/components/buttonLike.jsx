// import React from "react";
// import { colors } from "../assets/colors";

// const buttonLikeStyle = {
//   margin: "10px",
//   backgroundColor: colors.AWS_greyBlue,
//   // backgroundColor: 'white',
//   borderRadius: "25px",
//   //border: '2px solid #232f3e';
//   boxShadow: "2px 2px 2px 2px #232f3e"
// };
// function ButtonLike() {
//   return (
//     <button style={buttonLikeStyle} onClick={() => alert("you liked the post")}>
//       Like
//     </button>
//   );
// }

// export default ButtonLike;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
      <Fab color="secondary" aria-label="add" className={classes.fab}>  
        <FavoriteIcon onClick={() => alert("You liked the post")}/>
      </Fab>
    </div>
  );
}