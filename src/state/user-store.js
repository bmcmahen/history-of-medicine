'use strict';

import { Store } from 'flummox';
import debug from 'debug';

const log = debug('app:state:stores');

class UserStore extends Store {

  constructor(flux){
    super();

    // register our actions
    const userActions = flux.getActions('users');
    this.register(userActions.getCurrentSession, this.getCurrentSession);
    this.register(userActions.login, this.handleLogin);
    this.register(userActions.register, this.handleRegister);
    this.register(userActions.logout, this.handleLogout);

    // set default state
    this.state = {
      user: {},
      loggedIn: false,
      loaded: false
    };
  }

  getCurrentSession(user){
    log('got user %o', user);
    if (user._id) {
      this.setState({
        user: user,
        loaded: true,
        loggedIn: true
      });
    } else {
      log('no current session %j', user);
      this.setState({
        user: {},
        loaded: true,
        loggedIn: false
      });
    }
  }

  handleLogin(res){
    if (res.status === 200) {
      this.setState({
        user: res.body,
        loaded: true,
        loggedIn: true
      });
    } else {
      log('failed to login %j', res);
      this.setState({
        user: {},
        loaded: true,
        loggedIn: false
      });
    }
  }

  handleLogout(res){
    if (res.status === 200) {
      this.setState({
        user: {},
        loggedIn: false
      });
    } else {
      log('Failed to logout %j', res);
    }
  }

}

export default UserStore;
