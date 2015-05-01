import React from "react";
import FluxComponent from 'flummox/component';
import List from './List';

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
	componentWillMount () {

	}

	/**
	 * Runs on server and client.
	 */
	render () {
		return (
			<FluxComponent flux={this.props.flux} connectToStores={['users']}>
				<List />
			</FluxComponent>
		);
	}

}

export default Main;
