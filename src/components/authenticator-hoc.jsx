import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

export const withAuthenticator = WrappedComponent => {
  const HOC = ({ history }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let unmounted = false;

      if (!unmounted) {
        firebase.auth().onAuthStateChanged(currentUser => {
          if (!currentUser) {
            history.push('/login');
          } else {
            setLoading(false);
          }
        });
      }

      return () => {
        unmounted = true;
      };
    }, [history]);

    return !loading && <WrappedComponent />;
  };

  return withRouter(HOC);
};
