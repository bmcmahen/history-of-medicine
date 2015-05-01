import React from "react";
import Router from "react-router";
import Transmit from "react-transmit";
import routes from "./components/Routes";
import DatabaseFlux from './state/flux';
import API from './methods/client';
import debug from 'debug';

// Expose debugger on client
window._bugger = debug;

/**
 * Fire-up React Router.
 */

const flux = new DatabaseFlux(API);

if (window.__reactTransmitPacket) {
	flux.preload(window.__reactTransmitPacket);
}

Router.run(routes, Router.HistoryLocation, (Handler, state) => {

	function fetchDocs(routes, ...args) {
		return Promise.all(routes
			.filter(route => route.handler.fetchData)
			.map(route => {
				return route.handler.fetchData(...args);
			})
		);
	}

	fetchDocs(state.routes, state.params, flux)
		.then(() => {
			React.render(<Handler flux={flux} />, window.document.getElementById('react-root'));
		});
});

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (process.env.NODE_ENV !== "production") {
	const reactRoot = window.document.getElementById("react-root");

	if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes ||
	    !reactRoot.firstChild.attributes["data-react-checksum"]) {
		console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
	}
}
