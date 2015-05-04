'use strict';

import React, {Component} from 'react';
import FluxComponent from 'flummox/component';
import {RouteHandler} from 'react-router';

if (__CLIENT__) {
  require('./index.css');
}

/**
 * Main React Application entry for both server
 * and cient envs.
 */

class Main extends Component {

  constructor(props){
    super(props);
  }

  static async fetchData(params, flux) {
    const actions = flux.getActions('users');
    return await actions.getUser('ben');
  }

  render () {
    return (
      <FluxComponent flux={this.props.flux} connectToStores={['users']}>
        <RouteHandler />
      </FluxComponent>
    );
  }

}

Main.propTypes = {

};

export default Main;
