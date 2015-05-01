import { Store } from 'flummox';
import Debug from 'debug';

const debug = Debug('app:state:stores');

class UserStore extends Store {

  constructor(flux) {
    super();
    const userActions = flux.getActions('users');
    this.register(userActions.getUser, this.handleGetUser);
    this.state = {
      user: {}
    };
  }

  handleGetUser(user){
    debug('got user %o', user);
    this.setState({
      user: user
    });
  }

}

export default UserStore;
