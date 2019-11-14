import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import addPerson from '../addPerson.svg';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
      },
      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      title: {
        margin: theme.spacing(4, 0, 2),
      },
}));

function FeaturesList() {
    return (
        <List>
            <ListItem>
               <ListItemAvatar>
                    <Avatar>
                        <addPerson/>
                    </Avatar>
                </ListItemAvatar> 
                <ListItemText>
                    czejś wuja
                </ListItemText>
            </ListItem>
        </List>
    )
}

export default FeaturesList;