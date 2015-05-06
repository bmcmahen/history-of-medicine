import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import Main from '../ui-App';
import List from '../ui-List';
import Admin from '../ui-Admin';
import Login from '../ui-Login';
import Register from '../ui-Register';

/**
 * The React Routes for both the server and the client.
 */

export default (
  <Route handler={Main} path='/'>
    <DefaultRoute handler={List} />
    <Route name='admin' path='/admin' handler={Admin} />
    <Route name='login' path='/login' handler={Login} />
    <Route name='register' path='/register' handler={Register} />
  </Route>
);
