'use strict';

/**
 * Module dependencies
 */

import {Server} from 'hapi';
import React from 'react';
import Router from './components/Router';
import routes from './Components/Routes';
import Promise from 'bluebird';
import Flux from './State/flux';
import injectScript from './util/inject';
import config from './config';
import Basic from 'hapi-auth-basic';
import AuthCookie from 'hapi-auth-cookie';
import ms from 'milliseconds';
import Good from 'good';
import GoodConsole from 'good-console';
import ApiRoutes from './api';
import Mongo from './plugins/mongo';
import Methods from './methods/server';
import Boom from 'boom';
import PromiseMethods from './plugins/promise-methods';

/**
 * Create new Hapi Server
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
], (pluginError) => {
  if (pluginError) throw pluginError;

  // create redis server cache
  const cache = server.cache({
    expiresIn: 14 * 24 * 60 * 60 * 1000, // 2 weeks
    segment: 'sessions'
  });

  server.bind({
    sessionCache: cache
  });

  // create standard auth strategy using cookies
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

  // add all of our api routes
  server.route(ApiRoutes);

  // Static files
  server.route({
    method: 'get',
    path: '/assets/{path*}',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try'
      }
    },
    handler: {
      directory: {
        path: './static',
        listing: true,
        index: true
      }
    }
  });

  // App Routes
  server.route({
    method: 'get',
    path: '/{params*}',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try'
      }
    },
    handler: (request, reply) => {

      // if it's a json request, reply not-found
      let type = request.headers['content-type'];
      if (type && type === 'application/json') {
        return reply(Boom.notFound());
      }

      /**
       * Preload docs for routes to be rendered
       * @param {Array} routes
       * @param {Arguments} ...args
       */

      function fetchDocs(routes, ...args) {
        return Promise.all(routes
          .filter(route => route.handler.fetchData)
          .map(route => {
            return route.handler.fetchData(...args);
          })
        );
      }

      // Create flux context
      let api = server.plugins.fns;
      let flux = new Flux(api);

      // preload our session
      let currentUser = request.auth.credentials &&
        request.auth.credentials.user;

      let preload = currentUser
        ? {
            users: {
              user: currentUser,
              loaded: true,
              loggedIn: true
            }
          }
        : {
          users: {
            loaded: true,
            loggedIn: false
          }
        };

      flux.preload(preload);


      /**
       * Instantiate a new Router
       */

      const router = Router.create({
        routes: routes,
        location: request.path,
        onAbort: onAbort,
        transitionContext: flux
      });

      /**
       * If a redirection occurs, render that instead
       * @param {Object} reason
       */

      function onAbort(reason) {
        if (reason.constructor.name === 'Redirect'){
          const route = router.makePath(reason.to, reason.params, reason.query);
          return reply.redirect(route);
        }
        server.log(reason);
        return reply(Boom.badImplementation());
      }

      /**
       * Run our router, and create a new flux
       */

      router.run((Handler, state) => {

        // fetch all of the docs
        fetchDocs(state.routes, state.params, flux)
          .then(() => {
            let reactString = React.renderToString(<Handler flux={flux} />);
            let output = (
              `<!doctype html>
              <html lang="en-us">
                <head>
                  <meta charset="utf-8">
                  <title>History of Medicine</title>
                  <link rel="shortcut icon" href="/assets/favicon.ico">
                  <link href='http://fonts.googleapis.com/css?family=Roboto:400,400italic,500,300italic,300,500italic,700,700italic' rel='stylesheet' type='text/css'>
                  <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400italic,700italic,400,700' rel='stylesheet' type='text/css'>
                  <script src="//use.typekit.net/znc4nio.js"></script>
                  <script>try{Typekit.load();}catch(e){}</script>
                </head>
                <body>
                  <div id="react-root">${reactString}</div>
                </body>
              </html>`
            );

            let host = process.env.NODE_ENV === 'production' ? null : '//localhost:8080';
            output = injectScript(output, flux.toJSON(), [`${host}/client.js`]);
            reply(output);

          })
          .catch(err => {
            return reply(Boom.wrap(err));
          });
      });
    }
  });

  server.start();

});
