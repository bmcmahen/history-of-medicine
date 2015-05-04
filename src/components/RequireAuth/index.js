'use strict';

import React from 'react';

/**
 * Any Component passed to this will require the the user is
 * logged in. If not, it redirects them to the 'Login' path
 */

const requireAuth = (Component) => {
  return class Authenticated extends React.Component {

    static willTransitionTo(transition, props) {
      if (!props.loggedIn) {
        transition.redirect('/login', {}, { nextPath: transition.path });
      }
    }

    render() {
      return <Component {...this.props} />;
    }

  };
};

export default requireAuth;
