import React from "react";
import FluxComponent from 'flummox/component';
import List from '../ui-List';

if (__CLIENT__) {
  require('./index.css');
}

/**
 * Main React application entry-point for both the server and client.
 */

class Main extends React.Component {

	static async fetchData(params, flux) {
		const actions = flux.getActions('users');
		return await actions.getUser('ben');
	}

	/**
	 * Runs on server and client.
	 */
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
