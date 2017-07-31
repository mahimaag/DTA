/**
 * Express configuration
 */

'use strict';

import express from 'express';
// import favicon from 'serve-favicon';
import morgan from 'morgan';
import shrinkRay from 'shrink-ray';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
// import lusca from 'lusca';
import config from './environment';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
var MongoStore = connectMongo(session);

export default function(app) {
  var env = app.get('env');

  // if(env === 'development' || env === 'test') {
    // app.use(express.static(path.join(config.root, 'dist')));
  // }

  if(env === 'production') {
    // app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }

  app.set('appPath', config.root);
  app.set('views', `${config.root}/server/views`);
  app.set('view engine', 'html');

  app.use(morgan('dev'));
  app.engine('html', require('ejs').renderFile);
  app.use(shrinkRay());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  if(env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
