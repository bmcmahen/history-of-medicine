import Mongodb from 'yieldb';
import Promise from 'bluebird';
import assert from 'assert';

exports.register = function(server, options, next) {

  assert(options.url, 'Url connection string required');

  Promise.coroutine(function*(){

    try {
      const db = yield Mongodb.connect(options.url);
      server.expose('mongo', db);
      next();
    } catch(err) {
      next(err);
    }

  })();

};

exports.register.attributes = {
  name: 'db'
};
