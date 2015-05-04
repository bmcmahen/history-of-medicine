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

  async getUser() {
    // const userStore = this.flux.getStore('users');

    try {
      return await this.api.getUserById();
    } catch(err) {
      log('error fetching user %j', err);
    }
  }

}

export default UserActions;
