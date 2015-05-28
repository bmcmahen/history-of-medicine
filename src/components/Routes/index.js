import React from 'react'
import {Route, DefaultRoute} from '../Router'
import Main from '../ui-App'
import List from '../ui-List'
import Admin from '../ui-Admin'
import Login from '../ui-Login'
import Register from '../ui-Register'
import Timeline from '../ui-Timeline'
/**
 * The React Routes for both the server and the client.
 */

export default (
  <Route handler={Main} path='/'>
    <Route path='/' handler={List}>
      <Route name='timeline' path='timeline' handler={Timeline} />
      <Route name='timeline-detail' path='timeline/:id' handler={Timeline} />
    </Route>
    <Route name='admin' path='/admin' handler={Admin} />
    <Route name='login' path='/login' handler={Login} />
    <Route name='register' path='/register' handler={Register} />
  </Route>
)
