import React, { useEffect, useState } from 'react';
import Post from '../components/post';
import NewPost from '../components/post-form';
import database from '../api/database';
import { withAuthenticator } from '../components/authenticator-hoc';

function Dashboard({ currentUser }) {
  const [postWrappers, setPostWrappers] = useState(null);

  async function fetch() {
    setPostWrappers(await database.getPosts());
  }

  useEffect(() => {
    fetch();
  }, []);

  // TODO: return loader
  if (!postWrappers) return <></>;
  return (
    <>
      <NewPost currentUser={currentUser} fetchPosts={fetch} />
      <div>
        {postWrappers.map(postWrapper => (
          <Post
            key={postWrapper.post.id}
            user={{
              userUid: postWrapper.userUid,
              username: postWrapper.username
            }}
            post={postWrapper.post}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
}

export default withAuthenticator(Dashboard);
