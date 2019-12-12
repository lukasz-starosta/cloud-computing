import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

export const withAuthenticator = WrappedComponent => {
  const HOC = props => {
    const { history } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let isMounted = true;

      if (isMounted) {
        firebase.auth().onAuthStateChanged(currentUser => {
          if (!currentUser) {
            history.push('/login');
          } else {
            setLoading(false);
          }
        });
      }

      return () => {
        isMounted = false;
      };
    }, [history]);

    return !loading && <WrappedComponent {...props} />;
  };

  return withRouter(HOC);
};
