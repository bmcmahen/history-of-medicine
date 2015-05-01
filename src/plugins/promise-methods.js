'use strict';

import Promise from 'bluebird';
import Boom from 'boom';
import Hoek from 'hoek';

exports.register = function(server, options, next){
  this.server = server;
  this.methods = new Methods(server);

  server.plugins.fns = this.methods.methods;

  server.expose('add', this.methods.add.bind(this.methods));

  next();
};

exports.register.attributes = {
  name: 'fns',
  version: '1.0.0'
};

function Methods(server) {
  this.server = server;
  this.methods = {};
}

Methods.prototype.add = function(name, method, options, realm) {
  if (typeof name !== 'object') {
    return this._add(name, method, options, realm);
  }

  let items = [].concat(name);
  for (let i = 0, il = items.length; i < il; ++i){
    let item = items[i];
    this._add(item.name, item.method, item.options, realm);
  }
};

Methods.prototype.assign = function(name, fn){
  var path = name.split('.');
  var ref = this.methods;

  for (var i = 0, il = path.length; i < il; ++i) {
    if (!ref[path[i]]) {
        ref[path[i]] = (i + 1 === il ? fn : {});
    }
    ref = ref[path[i]];
  }
};

Methods.prototype._add = function(name, method, options, realm) {
  options = options || {};
  var settings = Hoek.cloneWithShallow(options, ['bind']);
  settings.generateKey = settings.generateKey || generateKey;

  var bind = settings.bind || realm.settings.bind || null;

  if (!settings.cache) {
    var bound = bind ? function() { return method.apply(bind, arguments); } : method;
    this.assign(name, bound);
    return;
  }

  // the method that's called if the cache can't
  // find the document. basically, we rerun the function
  // with the supplied arguments, and return 'next'
  settings.cache.generateFunc = function(id, next){

    return method.apply(bind, id.args)
      .then(function(doc){
        return next(null, doc);
      })
      .catch(function(err){
        return next(err);
      });
  };

  var cache = this.server.cache(settings.cache, '#' + name);

  // create a new function to be called which returns a promise,
  // first fetches from our cache
  var fn = function() {
    var args = [].slice.call(arguments);

    return new Promise((resolve, reject) => {

      // generate function key
      var key = generateKey.apply(null, args);
      if (key === null || typeof key !== 'string') {
        return reject(Boom.badImplementation('Invalid method key'));
      }

      // get our result from the cache
      cache.get({ id: key, args: args }, (err, doc, cached) => {
        if (err) return reject(err);
        return resolve(doc);
      });

    });
  }

  fn.cache = {

    drop: function() {

      var args = [].slice.call(arguments);

      return new Promise(function(resolve, reject){

        // generate function key
        var key = generateKey.apply(null, args);
        if (key === null || typeof key !== 'string') {
          return reject(Boom.badImplementation('Invalid method key'));
        }

        cache.drop(key, function(err){
          if (err) return reject(err);
          resolve();
        });

      });
    }

  };

  this.assign(name, fn);

};


function generateKey() {
  var key = '';
  for (var i = 0, il = arguments.length; i < il; ++i) {
      var arg = arguments[i];
      if (typeof arg !== 'string' &&
          typeof arg !== 'number' &&
          typeof arg !== 'boolean') {

          return null;
      }

      key += (i ? ':' : '') + encodeURIComponent(arg.toString());
  }

  return key;
}
