import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import MainLayout from './components/layout/main-layout';
import About from './pages/about';
import Landing from './pages/landing';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import firebase from 'firebase/app';
import 'firebase/firestore';
import database from './api/database';

function App() {
  const [isReady, setIsReady] = useState(false);

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
    database.initialize(firebase.firestore());

    setIsReady(true);
  }, []);

  // TODO: Add a loader here when the app is initalizing
  if (!isReady) return <></>;

  return (
    <Router>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MainLayout>
          {user => (
            <div>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                <Route exact path='/'>
                  <Landing />
                </Route>
                <Route
                  path='/dashboard'
                  render={props => <Dashboard {...props} user={user} />}
                ></Route>
                <Route path='/profile'>
                  <Profile />
                </Route>
                <Route path='/about'>
                  <About />
                </Route>
                <Route path='/login'>
                  <Login />
                </Route>
              </Switch>
            </div>
          )}
        </MainLayout>
      </MuiPickersUtilsProvider>
    </Router>
  );
}

export default App;
