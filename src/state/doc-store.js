'use strict'

import { Store } from 'flummox'
import debug from 'debug'

const log = debug('app:state:doc-store')

class UserStore extends Store {

  constructor (flux) {
    super()

    // register our actions
    const docActions = flux.getActions('docs')
    this.register(docActions.setActiveDoc, this.setActiveDoc)

    // set default state
    this.state = {
    };
  }

  setActiveDoc (doc) {
    this.setState({ activeDocument: doc })
  }

  getActiveDoc () {
    return this.state.activeDocument
  }

}

export default UserStore;
