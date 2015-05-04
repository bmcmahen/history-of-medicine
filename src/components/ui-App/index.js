'use strict';

import React from 'react';
import FluxComponent from 'flummox/component';

if (__CLIENT__) {
  require('./index.css');
}

/**
 * Main React Application entry for both server
 * and cient envs.
 */

class Main extends React.Component {

  static async fetchData(params, flux) {
    const actions = flux.getActions('users');
    return await actions.getUser('ben');
  }

  render () {
    return (
      <FluxComponent flux={this.props.flux} connectToStores={['users']}>
        <div className='App'>
          <h1>bacon!</h1>
        </div>
      </FluxComponent>
    );
  }

}

export default Main;
