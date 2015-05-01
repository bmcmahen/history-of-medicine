import { Actions } from 'flummox';

class UserActions extends Actions {

  constructor(flux, api) {
    super();
    this.flux = flux;
    this.api = api;
  }

  getUser(name) {
    const userStore = this.flux.getStore('users');
    if (userStore.state.user) return;
    return this.api.getUserById();
  }

}

export default UserActions;
