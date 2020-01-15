import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function FloatingActionButton(props) {
  const classes = useStyles();
  const isLikeIcon = props.isLikeIcon;
  const color = props.color;
  const icon = isLikeIcon ? (
    <FavoriteIcon
      onClick={() => {
        props.click();
      }}
    />
  ) : (
    <AddCommentIcon onClick={() => props.addComment()} />
  );

  return (
    <div>
      <Fab disabled={props.isDisabled} color={color} aria-label="add" className={classes.fab}>
        {icon}
      </Fab>
    </div>
  );
}
