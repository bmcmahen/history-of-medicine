'use strict';

import { Actions } from 'flummox';
import debug from 'debug';

const log = debug('app:state:app-actions');

class AppActions extends Actions {

  constructor(flux, api) {
    super();
    this.flux = flux;
    this.api = api;
  }

  setTitle(title){
    return { title : title }
  }

}

export default AppActions;
