'use strict'

import { Actions } from 'flummox'
import debug from 'debug'

const log = debug('app:state:doc-actions')

class AppActions extends Actions {

  constructor (flux, api) {
    super()
    this.flux = flux
    this.api = api
  }

  setActiveDoc (doc) {
    return doc
  }

}

export default AppActions
