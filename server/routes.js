/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import authMiddlewares from "./components/auth";
import redirectUrlFunction from "./components/auth/redirectUrl";
import logout from "./components/auth/logout";
import express from 'express';
export default function (app) {

  const logMiddleware = (m) => (r1, r2, n) => {
    console.log(m);
    n();
  }
  //middlewares
  const indexFile = path.join(app.get('appPath'), 'client', 'assests', 'index.html' );
  const distFolder = path.join(app.get('appPath'), 'dist');
  console.log('Dist folder - ', distFolder);
  console.log('Index file - ', indexFile);
  app.use(authMiddlewares);
  app.use(express.static(indexFile), logMiddleware('After index file'));
  app.use(express.static(distFolder), logMiddleware('After dist folder'));
  app.use('/api', authMiddlewares);
  app.use('/api/employees', require('./api/employee'));
    app.use('/api/oauthServerCallback',redirectUrlFunction, (req, res) => {
      res.redirect('/');
    });
  app.get('/logout', logout);


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);
  /*app.route('/!*', authMiddlewares)
      .get((req, res) => {
      console.log('NOT MATCHING ANY ROUTE...');
      res.sendFile(indexFile);
  });*/
  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      console.log('NOT MATCHING ANY ROUTE...');
      res.sendFile(indexFile);
    });
}
