'use strict';

import debug from 'debug';
import superagent from 'superagent';
import Promise from 'bluebird';

const log = debug('app:methods:client');

/**
 * Fetch request helper
 * @param  {String } path
 * @param  {String } method
 * @param  {Object } body
 * @return {Promise}
 */

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    let req = superagent[method](path).send(body);
    req.end((err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

/**
 * API methods
 */

export default {

  async getCurrentSession() {
    return await request('get', '/api/user/me');
  },

  async login(email, password) {
    let body = { email: email, password: password };

    try {
      let res = await request('post', '/auth/login', body);
      log('login response %o', res);
      return { status: res.status, body: res.body };
    } catch(err) {
      console.error(err);
      return { status: err.status, text: err.message };
    }
  },

  async logout() {
    return await request('get', '/auth/logout');
  },

  async register(email, password) {
    let body = { email: email, password: password };
    let res = await request('post', '/auth/register', body);
    if (res.status === 200) {
      let json = await res.json();
      return { status: res.status, body: json };
    }
    return { status: res.status, text: res.statusText };
  }

};
