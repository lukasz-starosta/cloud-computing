import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CreateIcon from "@material-ui/icons/Create";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  icon: {
    color: grey[200],
    backgroundColor: grey[900]
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

function FeaturesList() {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" className={classes.title}>
        What you can do in our app:
      </Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.icon}>
              <AccountBoxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>Follow other users</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.icon}>
              <AddPhotoAlternateIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>Add pictures</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.icon}>
              <CreateIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>Write posts</ListItemText>
        </ListItem>
      </List>
    </Grid>
  );
}

export default FeaturesList;
