'use strict';

import Boom from 'boom';
import Promise from 'bluebird';
import Bcrypt from 'bcrypt';
import Joi from 'joi';
import config from '../../config';
import {comparePassword, generateHash} from './methods';

const PRIVATE_KEY = config('/auth/privateKey');


/**
 * Basic Auth routes
 */

module.exports = [


  {
    method: 'GET',
    path: '/logout',
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
    path: '/login',
    config: {
      description: 'Validate login credentials',
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      },
      handler: Promise.coroutine(function*(request, reply){
        const body = request.payload;
        try {

          // First ensure that the user exists

          const user = {};

          if (!user) {
            return reply(Boom.unauthorized);
          }

          yield comparePassword(body.password, user.password);
          this.sessionCache.set(user.id, { user: user }, 0, err => {
            if (err) return reply(Boom.wrap(err));
            request.auth.session.set({ sid: user.id });
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
    path: '/register',
    config: {
      description: 'Allow users to register themselves',
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      validate: {
        payload: {
          email: Joi.string().trim().email().required(),
          password: Joi.string().trim().alphanum().min(8).required(),
          image: Joi.string().hostname().optional()
        }
      }
    },
    handler: Promise.coroutine(function*(request, reply){
      const body = request.payload;
      try {

        // ensure that this user doesn't already exist

        // generate password hash
        const hash = yield generateHash(body.password);

        // insert new user into database

        const user = {};
        this.sessionCache.set(user.id, { user : user }, 0, err => {
          if (err) return reply(Boom.wrap(err));
          request.auth.session.set({ sid: user.id });
          reply(user).code(200);
        });

      } catch(err) {
        return reply(Boom.wrap(err));
      }
    })

  }
];
