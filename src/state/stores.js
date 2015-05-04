'use strict';

import { Store } from 'flummox';
import debug from 'debug';

const log = debug('app:state:stores');

class UserStore extends Store {

  constructor(flux){
    super();
    const userActions = flux.getActions('users');
    this.register(userActions.getUser, this.handleGetUser);
    this.register(userActions.login, this.handleLogin);
    this.state = {
      user: {},
      loggedIn: false
    };
  }

  handleGetUser(user){
    log('got user %o', user);
    this.setState({
      user: user,
      loggedIn: true
    });
  }

  handleLogin(err, user){
    if (err) {
      this.setState({
        user: {},
        loggedIn: false
      });
    } else {
      this.setState({
        user: user,
        loggedIn: true
      });
    }
  }

}

export default UserStore;
