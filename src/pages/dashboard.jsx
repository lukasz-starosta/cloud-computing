import React, { useEffect, useState } from 'react';
import Post from '../components/post';
import NewPost from '../components/post-form';
import database from '../api/database';

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetch() {
      setPosts(await database.getPosts());
    }

    fetch();
  }, []);

  // TODO: return loader
  if (posts.length === 0) return <></>;

  return (
    <>
      <NewPost />
      <div>
        {posts.map(post => (
          <Post key={post.post.id} username={post.username} post={post.post} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
