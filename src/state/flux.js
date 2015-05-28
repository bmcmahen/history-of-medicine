'use strict'

import { Flux } from 'flummox'
import UserActions from './user-actions'
import UserStore from './user-store'
import AppStore from './app-store'
import AppActions from './app-actions'
import DocStore from './doc-store'
import DocActions from './doc-actions'
import _ from 'lodash'
import debug from 'debug'

const log = debug('app:state:flux')

class DatabaseFlux extends Flux {

  constructor (api) {
    super()
    if (!api) throw new Error('API required')
    this.api = api

    // register actions
    this.createActions('users', UserActions, this, api)
    this.createActions('app', AppActions, this, api)
    this.createActions('docs', DocActions, this, api)

    // register stores
    this.createStore('users', UserStore, this)
    this.createStore('app', AppStore, this)
    this.createStore('docs', DocStore, this)
  }

  toJSON () {
    let stores = ['users', 'app', 'docs']
    let json = {}
    stores.forEach(key => {
      json[key] = this.getStore(key).state
    })
    return json
  }

  /**
   * Inject json into store state. This should only
   * be used for preloading content.
   */

  preload (json) {
    log('attempting to preload with %o', json)
    Object.keys(json).forEach(key => {
      let store = this.getStore(key)
      if (store) {
        log('preloading %s with %o', key, json[key])
        _.extend(store.state, json[key])
      }
    })
  }
}

export default DatabaseFlux
