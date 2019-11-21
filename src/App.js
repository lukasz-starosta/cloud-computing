import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import MainLayout from './components/layout/main-layout';
import About from './pages/about';
import Landing from './pages/landing';

import firebase from 'firebase/app';

function App() {
  useEffect(() => {
    var firebaseConfig = {
      apiKey: 'AIzaSyDL5rG1rHKZLHM030r9lFgfgo-bt3x5WEE',
      authDomain: 'cloud-computing-systems.firebaseapp.com',
      databaseURL: 'https://cloud-computing-systems.firebaseio.com',
      projectId: 'cloud-computing-systems',
      storageBucket: 'cloud-computing-systems.appspot.com',
      messagingSenderId: '321417080788',
      appId: '1:321417080788:web:cd357a543a3fc896f37041'
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }, []);

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
