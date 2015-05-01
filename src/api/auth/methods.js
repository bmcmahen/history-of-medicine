import Bcrypt from 'bcrypt';
import Promise from 'bluebird';
import Boom from 'boom';

/**
 * Compare password function using Bcrypt
 *
 * @param  {String} password
 * @param  {Hashed} userPassword
 *
 * @return {Promise}
 */

export function comparePassword(password, userPassword) {
  return new Promise((resolve, reject) => {
    Bcrypt.compare(password, userPassword, (err, isValid) => {
      if (err) return reject(err);
      if (!isValid) return reject(Boom.unauthorized());
      resolve();
    });
  });
}

/**
 * Generate password hash
 *
 * @param  {String} password
 *
 * @return {String}
 */

export function generateHash(password) {
  return new Promise((resolve, reject) => {
    Bcrypt.hash(password, 8, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
}
