import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import API from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';

import config from './aws-exports';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import MainLayout from './components/layout/main-layout';
import About from './pages/about';
import Landing from './pages/landing';

API.configure(config); // Configure Amplify
PubSub.configure(config);

function App() {
  return (
    <Router>
      <div>
        <MainLayout>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
