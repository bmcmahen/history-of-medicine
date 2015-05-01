import Confidence from 'confidence';
import pkg from '../package.json';
import CatboxRedis from 'catbox-redis';


const master = Object.freeze({

  version: pkg.version,
  cache: {
    engine: CatboxRedis,
    host: '127.0.0.1',
    partition: 'cache',
    expiresIn: 60 * 60 * 1000
  },

  http: {
    host: 'localhost',
    port: 8000
  },

  views: {
  relativeTo: __dirname,
  layout: 'layout',
  layoutPath: 'views/layouts',
  path: 'views',
  isCached:{
    $filter: 'env',
    production: true,
    $default: false
  }
  },

  cookie: {
    password: 'peanutbutter',
    cookie: 'sid-bento',
    isSecure: process.env.NODE_ENV == 'production',
    redirectTo: false
  },

  redis: {
    $filter: "env",
    production: {
      url: "localhost:6379",
      port: 6379,
      host: "localhost"
    },
    $default: {
      url: "localhost:6379",
      port: 6379,
      host: "localhost"
    }
  },

  mongo: {
    $filter: "env",
    production: {
      url: 'mongodb://localhost/test'
    },
    $default: {
      url: 'mongodb://localhost/test'
    }
  }

});

const store = new Confidence.Store(master);
const criteria = {
  env: process.env.NODE_ENV
};

export default function(key) {
  return store.get(key, criteria);
}
