import React, { useEffect, useState } from 'react';
import Post from '../components/post';
import database from '../api/database';

function MultiplePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetch() {
      setPosts(await database.getAllFromSubcollection('users', 'posts'));
    }

    fetch();
  }, []);

  // TODO: return loader
  if (posts.length === 0) return <></>;

  return (
    <div>
      {posts.map(post => (
        <Post username="wuja" content={post.content} />
      ))}
    </div>
  );
}

function Dashboard() {
  return <MultiplePosts />;
}

export default Dashboard;
