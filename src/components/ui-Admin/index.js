'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import requireAuth from '../RequireAuth';

class Admin extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='Admin'>
        Admin section
      </div>
    );
  }
}

export default requireAuth(Admin);
