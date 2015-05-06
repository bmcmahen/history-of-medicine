'use strict';

import React, {Component, PropTypes} from 'react';
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

  displayName = 'Main'

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
  }

  static async fetchData(params, flux) {
    if (__SERVER__) return;
    const store = flux.getStore('users');
    if (store.state.loaded) return;
    await flux.getActions('users').getCurrentSession();
  }

  render () {
    return (
      <FluxComponent flux={this.props.flux} connectToStores={{
        users: store => ({
          user: store.state
        })
      }}>
        <RouteHandler />
      </FluxComponent>
    );
  }

}

export default Main;
