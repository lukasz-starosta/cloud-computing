import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import { createBlog } from './graphql/mutations';

import config from './aws-exports';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
API.configure(config); // Configure Amplify
PubSub.configure(config);

async function createNewBlog() {
    const blog = { name: 'Test blog' };
    await API.graphql(graphqlOperation(createBlog, { input: blog }));
}

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
