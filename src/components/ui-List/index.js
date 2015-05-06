'use strict';

import React from 'react';
import {Link} from '../Router';

if (__CLIENT__) {
  require('./index.css');
}

class List extends React.Component {

  render(){

    return (
      <div className='List'>
        <p>List page</p>
        <Link to='admin'>Admin Page</Link>
      </div>

    );
  }

  changeName(){
    this.props.flux.getActions('users').getUser('bento');
  }
}

List.propTypes = {
  flux: React.PropTypes.object.isRequired
};

export default List;
