import React from "react";
import {Route, DefaultRoute} from "react-router";
import Main from "./Main";

if (__CLIENT__) {
	require('../styles/main.css');
}

/**
 * The React Routes for both the server and the client.
 *
 * @class Routes
 */
export default (
	<Route path="/">
		<DefaultRoute handler={Main} />
	</Route>
);
