/**
 * Main application file
 */

       'use strict';

import express from 'express';
import mongoose from 'mongoose';
import acl from 'acl';


mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
import seedDatabaseIfNeeded from './config/seed';
import logger from './components/logger';
// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options, function(error, db) {
    var mongoBackend = new acl.mongodbBackend(db, 'acl_');
});
mongoose.connection.on('error', function(err) {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});


/*var mongodb = require('mongodb');
mongodb.connect("mongodb://127.0.0.1:27017/acltest", function(error, db) {
    var mongoBackend = new acl.mongodbBackend(db, 'acl_');
});*/
// Setup server
const app = express();
// const server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

//using cookie-parser


// // Start server
// function startServer() {
//   app.angularFullstack = server.listen(config.port, config.ip, function() {
//     logger.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
//   });
// }

seedDatabaseIfNeeded();
// setImmediate(startServer);

// Expose app
exports = module.exports = app;
