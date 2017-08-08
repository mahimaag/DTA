'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

/*function requiredProcessEnv(name) {
 if(!process.env[name]) {
 throw new Error('You must set the ' + name + ' environment variable');
 }
 return process.env[name];
 }*/

// All configurations will extend these options
// ============================================
let all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 3000,

  //Cookie maxAge

  cookie: {
    MaximumAge: process.env.MAX_AGE || 900000,
    TsmsTokenCookie: process.env.AUTH_TSMS_TOKEN_COOKIE || 'Tsms',
    HrmsTokenCookie:process.env.AUTH_HRMS_TOKEN_COOKIE || 'nw_dev_oauthToken',
  },

  //Token expiry Time

  token: {
    ExpireTime: process.env.EXPIRES_IN || 900000,
    SecretKey: process.env.SECRET_KEY || 'NothingIsImpossible',
  },

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'tsms-server-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {});
