import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import database from '../api/database';
import UserLink from './user-link';

const useStyles = makeStyles({
  searchContainer: {
    width: 220,
    height: 35,
    marginLeft: 'auto'
  },
  searchInput: {
    borderRadius: 8,
    backgroundColor: '#3d3d4c',
    '&:hover': {
      backgroundColor: '#505061'
    },
    display: 'flex'
  },
  searchIcon: {
    width: 20,
    pointerEvents: 'none',
    marginLeft: 6,
    paddingTop: 2,
    display: 'flex',
    alignItems: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: 8,
    width: '100%'
  },
  predictionsDropdown: {
    position: 'relative',
    top: 6,
    boxSizing: 'border-box',
    minHeight: 200,
    width: 220,
    borderRadius: 8,
    padding: 4,
    background: '#3d3d4c'
  },
  user: {
    display: 'block',
    width: '90%',
    margin: '6px auto',
    borderRadius: 8,
    padding: '8px 6px',
    transition: 'all 0.1s ease-out',
    '&:hover': {
      background: '#505061'
    },
    textDecoration: 'none',
    color: 'white'
  },
  noResults: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#505061'
  }
});

function UserSearch() {
  const [value, setValue] = useState('');
  const handleChange = e => setValue(e.target.value);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await database.getAllFromCollection('users');
      setUsers(fetchedUsers.docs);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user
      .data()
      .name.toLowerCase()
      .startsWith(value.toLowerCase())
  );

  const classes = useStyles();

  const showPredictionsDropdown = value.length > 0;

  const displayUsernames = user => (
    <UserLink user={user} additionalClasses={classes.user} key={user.id} />
  );

  const predictionsDropdown = (
    <div className={classes.predictionsDropdown}>
      {filteredUsers.length > 0 ? (
        filteredUsers.map(displayUsernames)
      ) : (
        <div className={classes.noResults}>{'No results :('}</div>
      )}
    </div>
  );

  return (
    <div className={classes.searchContainer}>
      <div className={classes.searchInput}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search users"
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      {showPredictionsDropdown && predictionsDropdown}
    </div>
  );
}

export default UserSearch;
