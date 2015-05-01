import {Server} from "hapi";
import React from "react";
import Router from "react-router";
import Transmit from "react-transmit";
import routes from "./Components/Routes";
import Promise from 'bluebird';
import Flux from './State/flux';
import injectScript from './util/inject';
import config from './config';
import Basic from 'hapi-auth-basic';
import Bcrypt from 'bcrypt';
import AuthCookie from 'hapi-auth-cookie';
import _ from 'lodash';
import ms from 'milliseconds';
import Good from 'good';
import GoodConsole from 'good-console';
import ApiRoutes from './api';
import Mongo from './plugins/mongo';
import Methods from './methods/server';
import PromiseMethods from './plugins/promise-methods';


/**
 * Start Hapi server on port 8000.
 */
const server = new Server(config('/server'));

server.connection({
	host: config('/http/host'),
	port: config('/http/port')
});

server.register([
	{ register: PromiseMethods },
	{
		register: Mongo,
		options: config('/mongo')
	},
	{ register: Basic },
	{ register: AuthCookie },
	{
		register: Good,
		options: {
			opsInterval: 15000,
			reporters: [{
				reporter: GoodConsole,
				events: { log: '*', response: '*', error: '*', info: '*' }
			}]
		}
	}
], (err) => {
	if (err) throw err;

		// create a session cache from our catbox redis policy
	const cache = server.cache({
		expiresIn: 14 * 24 * 60 * 60 * 1000, // 2 weeks
		segment: 'sessions'
	});

	server.auth.strategy('session', 'cookie', {
		password: config('/cookie/password'),
		ttl: ms.months(5),
		cookie: config('/cookie/cookie'),
		isSecure: config('/cookie/isSecure'),
		validateFunc: function(session, fn){
			cache.get(session.sid, function(err, item, cached){
				if (err) return fn(err, false);
				if (!cached) return fn(null, false);
				return fn(null, true, item);
			});
		}
	});

	// ensure that, as a default, all requests
	// require an authenticated user
	server.auth.default('session');

	// add our server methods, binding our
	// database client to that method
	for (let method of Methods) {
		method.options = method.options || {};
		method.options.bind = server.plugins.db.mongo;
		server.plugins.fns.add(method);
	}

	/**
	 * Attempt to serve static requests from the public folder.
	 */

	server.route({
		method:  "*",
		path:    "/{params*}",
		config: {
			auth: {
				strategy: 'session',
				mode: 'try'
			}
		},
		handler: (request, reply) => {
			reply.file("static" + request.path);
		}
	});

	server.route(ApiRoutes);

	/**
	 * Catch dynamic requests here to fire-up React Router.
	 */

	server.ext("onPreResponse", (request, reply) => {
		if (typeof request.response.statusCode !== "undefined") {
			return reply.continue();
		}

		function fetchDocs(routes, ...args) {
			return Promise.all(routes
				.filter(route => route.handler.fetchData)
				.map(route => {
					return route.handler.fetchData(...args);
				})
			);
		}


		Router.run(routes, request.path, (Handler, state) => {

			let api = server.plugins.fns;
			let flux = new Flux(api);

			fetchDocs(state.routes, state.params, flux)
				.then(() => {
					let reactString = React.renderToString(<Handler flux={flux} />);
					let output = (
						`<!doctype html>
						<html lang="en-us">
							<head>
								<meta charset="utf-8">
								<title>react-isomorphic-starterkit</title>
								<link rel="shortcut icon" href="/favicon.ico">
							</head>
							<body>
								<div id="react-root">${reactString}</div>
							</body>
						</html>`
					);

					let host = process.env.NODE_ENV === 'production' ? null : '//localhost:8080';
					output = injectScript(output, flux.toJSON(), [`${host}/dist/client.js`]);
					reply(output);

				})
				.catch(err =>{
					reply(err.stack).code(500);
				});

		});
	});

	server.start();

});
