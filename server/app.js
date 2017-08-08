/**
 * Main application file
 */

       'use strict';

import express from 'express';
import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');
import config from './config/environment';
import seedDatabaseIfNeeded from './config/seed';
import logger from './components/logger';
// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
const app = express();
// const server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);


seedDatabaseIfNeeded();
// setImmediate(startServer);

// Expose app
 module.exports = app;
