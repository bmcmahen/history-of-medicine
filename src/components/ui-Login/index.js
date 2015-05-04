'use strict';

import React from 'react';
import debug from 'debug';

const log = debug('App:components:ui-Login');

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    var { router } = this.context;
    const nextPath = router.getCurrentQuery().nextPath;
    var {email, pass} = this.state;
    log('login %s, password %s', email, pass);
    // login fn
    // if error, set state
    // if nextPath, router.replaceWith(nextPath)
    // otherwise, use default next path
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          <input type='email' placeholder='email'/>
        </label>
        <label>
          <input type='password' placeholder='password'/>
        </label>
        <button type='submit'>Login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func
};

export default Login;
