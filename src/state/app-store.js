'use strict'

import { Store } from 'flummox'
import debug from 'debug'

const log = debug('app:state:app-store')

class AppStore extends Store {

  constructor (flux) {
    super()

    // register our actions
    const appActions = flux.getActions('app')
    this.register(appActions.setTitle, this.setTitle)

    // set default state
    this.state = {
      title: ''
    }
  }

  setTitle (title) {
    log('set title %o', title)
    this.setState(title)
  }

  getTitle () {
    return this.state.title
  }

}

export default AppStore
