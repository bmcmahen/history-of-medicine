import _ from 'lodash';
import authRoutes from './auth/routes';

const routes = _.union(
  authRoutes
);

export default routes;
