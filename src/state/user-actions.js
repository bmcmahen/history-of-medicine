'use strict';

import { Actions } from 'flummox';
import debug from 'debug';

const log = debug('app:state:actions');

class UserActions extends Actions {

  constructor(flux, api) {
    super();
    this.flux = flux;
    this.api = api;
  }

  async getCurrentSession() {
    log('fetching current session');
    let res = await this.api.getCurrentSession();
    return await res.json();
  }

  async login(username, password) {
    return await this.api.login(username, password);
  }

  async logout() {
    return await this.api.logout();
  }

  async register(email, password){
    return await this.api.register(email, password);
  }

}

export default UserActions;
