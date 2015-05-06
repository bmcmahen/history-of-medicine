'use strict';

import debug from 'debug';

// typical import doesn't work for this -- huh?
require('whatwg-fetch');

const log = debug('app:methods:client');

/**
 * Fetch request helper
 * @param  {String } path
 * @param  {String } method
 * @param  {Object } body
 * @return {Promise}
 */

function request(method, path, body) {
  let contents = {
    method: method,
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    contents.body = JSON.stringify(body);
  }

  return fetch(path, contents);
}

/**
 * API methods
 */

export default {

  async getCurrentSession() {
    let res = await request('get', '/api/user/me');
    return await res.json();
  },

  async login(email, password) {
    let body = { email: email, password: password };
    let res = await request('post', '/auth/login', body);
    log('login response %o', res);
    if (res.status === 200) {
      let json = await res.json();
      return { status: res.status, body: json };
    }
    return { status: res.status, text: res.statusText };
  },

  async logout() {
    let res = await request('post', '/auth/logout');
    return { status: res.status };
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
