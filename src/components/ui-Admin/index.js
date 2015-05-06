'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from '../Router';
import requireAuth from '../RequireAuth';

class Admin extends Component {

  static propTypes = {
    flux: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.func
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='Admin'>
        Admin section
        <a href='/auth/logout' onClick={this.logout.bind(this)}>Logout</a>
      </div>
    );
  }

  async logout(e){
    e.preventDefault();
    const { flux } = this.props;
    const { router } = this.context;
    try {
      await flux.getActions('users').logout();
      router.replaceWith('/');
    } catch(err) {
      this.setState({ error: 'Error logging out' });
    }
  }
}

export default requireAuth(Admin);
