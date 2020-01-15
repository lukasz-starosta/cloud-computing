import React, { useEffect, useState } from 'react';
import Post from '../components/post';
import NewPost from '../components/post-form';
import database from '../api/database';
import { withAuthenticator } from '../components/authenticator-hoc';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  noPosts: {
    color: '#8c8c8c',
    width: '80%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    margin: '16px auto'
  }
});

function Dashboard({ currentUser }) {
  const [postWrappers, setPostWrappers] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    async function fetch() {
      setPostWrappers(await database.getPostsOfFollowedUsers(currentUser.uid));
    }

    fetch();
  }, [currentUser.uid]);

  if (!postWrappers) return <></>;
  return (
    <>
      <NewPost currentUser={currentUser} fetchPosts={fetch} />
      <div>
        {postWrappers.length === 0 ? (
          <div className={classes.noPosts}>
            There are no posts to show :( Make sure you're following your friends!
          </div>
        ) : (
          postWrappers.map(postWrapper => (
            <Post
              key={postWrapper.post.id}
              user={{
                userUid: postWrapper.userUid,
                username: postWrapper.username
              }}
              post={postWrapper.post}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </>
  );
}

export default withAuthenticator(Dashboard);
