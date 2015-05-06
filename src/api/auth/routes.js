'use strict';

import Boom from 'boom';
import Promise from 'bluebird';
import Joi from 'joi';
import {ObjectId} from 'mongodb';
import {comparePassword, generateHash} from './methods';


/**
 * Basic Auth routes
 */

module.exports = [


  {
    method: 'GET',
    path: '/auth/logout',
    config: {
      description: 'Destroy the current user session',
      handler: function(request, reply) {
        request.auth.session.clear();
        return reply.code(200);
      }
    }
  },

  {
    method: 'POST',
    path: '/auth/login',
    config: {
      description: 'Validate login credentials',
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      validate: {
        payload: {
          email: Joi.string().required(),
          password: Joi.string().required()
        }
      },
      handler: Promise.coroutine(function*(request, reply){

        const body = request.payload;
        const db = request.server.plugins.db.mongo;

        try {

          // ensure that the user exists
          const Users = db.col('users');
          const user = yield Users.findOne({ email: body.email });

          if (!user) {
            return reply(Boom.unauthorized());
          }

          // authenticate the password
          yield comparePassword(body.password, user.password);

          delete user.password;

          // set our session if authentication succeeds
          this.sessionCache.set(user._id.toString(), { user: user }, 0, err => {
            if (err) return reply(Boom.wrap(err));
            request.auth.session.set({ sid: user._id.toString() });
            return reply(user).code(200);
          });

        } catch(err) {
          return reply(Boom.wrap(err));
        }
      })
    }
  },

  {
    method: 'POST',
    path: '/auth/register',
    config: {
      description: 'Allow users to register themselves',
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      validate: {
        payload: {
          email: Joi.string().trim().email().required(),
          password: Joi.string().trim().alphanum().min(8).required()
        }
      }
    },
    handler: Promise.coroutine(function*(request, reply){
      const body = request.payload;
      const db = request.server.plugins.db.mongo;

      try {

        const Users = db.col('users');
        const preExisting = yield Users.findOne({ email: body.email });

        // ensure prexisting user with this email doesn't already exist.
        if (preExisting) {
          return reply(Boom.unauthorized('User with this email already exists'));
        }

        // generate password hash
        const hash = yield generateHash(body.password);
        const _id = new ObjectId();
        const user = {
          _id: _id,
          email: body.email,
          password: hash,
          createdAt: new Date()
        };

        // insert new user into database
        yield Users.insert(user);

        // set cache to new user
        delete user.password;
        this.sessionCache.set( _id.toString(), { user: user }, 0, err => {
          if (err) return reply(Boom.wrap(err));
          request.auth.session.set({ sid: _id.toString() });
          reply(user).code(200);
        });

      } catch(err) {
        return reply(Boom.wrap(err));
      }
    })

  }
];
