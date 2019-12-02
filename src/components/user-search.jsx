import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import database from '../api/database';

const useStyles = makeStyles({
  search: {
    position: 'absolute',
    right: 36,
    borderRadius: 8,
    backgroundColor: '#3d3d4c',
    '&:hover': {
      backgroundColor: '#505061'
    },
    marginLeft: 'auto',
    width: 220
  },
  searchIcon: {
    width: 20,
    right: 10,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: '8px 8px 8px 16px',
    width: '100%'
  },
  predictionsDropdown: {
    boxSizing: 'border-box',
    position: 'absolute',
    right: 36,
    top: 46,
    minHeight: 200,
    width: 220,
    borderRadius: 8,
    padding: 4,
    background: '#3d3d4c'
  },
  user: {
    width: '90%',
    margin: '6px auto',
    borderRadius: 8,
    padding: '8px 6px',
    transition: 'all 0.1s ease-out',
    '&:hover': {
      background: '#505061'
    }
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
      .includes(value.toLowerCase())
  );

  const classes = useStyles();

  const showPredictionsDropdown = value.length > 0;

  const displayUsernames = user => (
    <div key={user.id} className={classes.user}>
      {user.data().name}
    </div>
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
    <>
      <div className={classes.search}>
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
    </>
  );
}

export default UserSearch;
