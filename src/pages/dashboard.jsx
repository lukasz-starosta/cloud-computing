import React from 'react';
import Post from '../components/post';

function MultiplePosts() {
  let posts = [];
  for (let i = 0; i < 10; i++) {
    posts.push(<Post key={i} />);
  }
  return <div>{posts}</div>;
}

function Dashboard() {
  return <MultiplePosts />;
}

export default Dashboard;
