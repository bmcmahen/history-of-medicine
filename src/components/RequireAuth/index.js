'use strict';

import React from 'react';
import debug from 'debug';

const log = debug('app:components:require-auth');

/**
 * Any Component passed to this will require the the user is
 * logged in. If not, it redirects them to the 'Login' path
 */

const requireAuth = (Component) => {
  return class Authenticated extends React.Component {

    static willTransitionTo (transition) {
      let store = transition.context.getStore('users');
      if (!store.state.loggedIn) {
        log('user not logged in, redirecting to login page');
        transition.redirect('/login', {}, { nextPath: transition.path });
      }
    }

    render () {
      return <Component {...this.props} />;
    }

  };
};

export default requireAuth;
