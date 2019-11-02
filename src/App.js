import React from 'react';

import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import { createBlog } from './graphql/mutations';

import config from './aws-exports';
API.configure(config); // Configure Amplify
PubSub.configure(config);

async function createNewBlog() {
    const blog = { name: 'Test blog' };
    await API.graphql(graphqlOperation(createBlog, { input: blog }));
}

function App() {
    return (
        <div className="App">
            <button onClick={createNewBlog}>Add Blog</button>
        </div>
    );
}

export default App;
