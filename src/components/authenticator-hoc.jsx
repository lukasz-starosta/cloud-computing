import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

export const withAuthenticator = WrappedComponent => {
  const HOC = ({ history }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let isMounted = false;

      if (!isMounted) {
        firebase.auth().onAuthStateChanged(currentUser => {
          if (!currentUser) {
            history.push('/login');
          } else {
            setLoading(false);
          }
        });
      }

      return () => {
        isMounted = true;
      };
    }, [history]);

    return !loading && <WrappedComponent />;
  };

  return withRouter(HOC);
};
