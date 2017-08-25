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
const AUTHORIZE_URL = "http://newers-world-oauth.qa2.tothenew.net/oauth/authorize?client_id=e6d6a83e-6c7a-11e7-9394-406186be844b";
export default function (app) {
    //middlewares
    const indexFile = path.join(app.get('appPath'), 'client', 'assests', 'index.html');
    const distFolder = path.join(app.get('appPath'), 'dist');
    app.use(cors());
    app.use('/authFail', (req,res) => {
        res.redirect(AUTHORIZE_URL)
    });
    app.use(authMiddlewares);

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
