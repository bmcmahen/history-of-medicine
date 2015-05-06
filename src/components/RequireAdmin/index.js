'use strict';

import React from 'react';
import debug from 'debug';

const log = debug('app:components:require-admin');

/**
 * Any Component passed to this will require the the user is
 * logged in. If not, it redirects them to the 'Login' path
 */

const requireAuth = (Component) => {
  return class isAdmin extends React.Component {

    static willTransitionTo(transition) {
      let store = transition.context.getStore('users');
      if (!store.state.loggedIn) {
        log('user not logged in, redirecting to login page');
        transition.redirect('/login', {}, { nextPath: transition.path });
      } else if (store.state.user && !store.state.user.admin) {
        transition.redirect('/', {}, {});
      }
    }

    render() {
      return <Component {...this.props} />;
    }

  };
};

export default requireAuth;
