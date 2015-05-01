import Hoek from 'hoek';
import _ from 'lodash';
import unauthenticatedRouteConfig from './route-config';

/**
 * Override the default route authentication config, to expose some
 * unauthenticated routes.
 * @param {Object} routes
 */

function processRoutes(routes) {
  if (routes.unauthenticated) {
    routes.unauthenticated = _.map(routes.unauthenticated, function(route){
      return Hoek.applyToDefaults(unauthenticatedRouteConfig, route);
    });
  }

  return _.union(routes.cookie, routes.unauthenticated);
}

export default processRoutes;
