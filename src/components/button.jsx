import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddCommentIcon from "@material-ui/icons/AddComment";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function FloatingActionButtons(props) {
  const classes = useStyles();
  const isLikeIcon = props.isLikeIcon;

  return isLikeIcon ? (
    <div>
      <Fab color="secondary" aria-label="add" className={classes.fab}>
        <FavoriteIcon onClick={() => alert("You liked the post")} />
      </Fab>
    </div>
  ) : (
    <div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddCommentIcon onClick={() => alert("You commented on the post")} />
      </Fab>
    </div>
  );
}
