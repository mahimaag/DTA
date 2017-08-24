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
import cors from "cors";
export default function (app) {
    //middlewares
    const indexFile = path.join(app.get('appPath'), 'client', 'assests', 'index.html');
    const distFolder = path.join(app.get('appPath'), 'dist');
    app.use(authMiddlewares);
    app.use(cors());
    app.use(express.static(indexFile));
    app.use(express.static(distFolder));
    app.use('/api/employees', require('./api/employee'));
    app.use('/api/activity', require('./api/activity'));
    app.use('/api/oauthServerCallback', redirectUrlFunction, (req, res) => {
        res.redirect('/');
    });
  app.get('/logout', logout);

    //Error handler for 500 res
    app.use(function _500ErrorMiddleware(err, req, res, next) {
        if (res.statusCode != 500) {
            return next(err);
        }
        res.sendfile(path.resolve("server/views/500.html"));
    });


    // All undefined asset or api routes should return a 404

    app.route('/:url(api|auth|app|assets)/*')
        .get(errors[404]);

    //Error handler for 404 res
    app.use(function _404ErrorMiddleware(err, req, res, next) {
        res.sendfile(path.resolve("server/views/404.html"));
    });
    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(indexFile);
        });
}
