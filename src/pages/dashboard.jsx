import React, { useEffect, useState } from 'react';
import Post from '../components/post';
import NewPost from '../components/post-form';
import database from '../api/database';

function Dashboard({ currentUser }) {
  const [postWrappers, setPostWrappers] = useState([]);

  async function fetch() {
    setPostWrappers(await database.getPosts());
  }

  useEffect(() => {
    fetch();
  }, []);

  // TODO: return loader
  if (postWrappers.length === 0) return <></>;

  return (
    <>
      <NewPost currentUser={currentUser} fetchPosts={fetch} />
      <div>
        {postWrappers.map(postWrapper => (
          <Post key={postWrapper.post.id} user={postWrapper.user} post={postWrapper.post} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
