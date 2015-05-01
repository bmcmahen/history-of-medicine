import { Flux } from 'flummox';
import UserActions from './actions';
import UserStore from './stores';
import _ from 'lodash';
import Debug from 'debug';

const debug = Debug('app:state:flux');

class DatabaseFlux extends Flux {

  constructor(api){
    super();
    this.api = api;
    this.createActions('users', UserActions, this, api);
    this.createStore('users', UserStore, this);
  }

  toJSON(){
    let stores = ['users'];
    let json = {};
    stores.forEach(key => {
      json[key] = this.getStore(key).state;
    });
    return json;
  }

  /**
   * Inject json into store state. This should only
   * be used for preloading content.
   */

  preload(json){
    debug('attempting to preload with %o', json);
    Object.keys(json).forEach(key => {
      let store = this.getStore(key);
      if (store) {
        debug('preloading %s with %o', key, json[key]);
        _.extend(store.state, json[key]);
      }
    });
  }
}

export default DatabaseFlux;
