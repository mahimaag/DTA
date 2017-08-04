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
    };
    //middlewares
    const indexFile = path.join(app.get('appPath'), 'client', 'assests', 'index.html');
    const distFolder = path.join(app.get('appPath'), 'dist');
    console.log('Dist folder - ', distFolder);
    console.log('Index file - ', indexFile);
    app.use(authMiddlewares);
    app.use(express.static(indexFile), logMiddleware('After index file'));
    app.use(express.static(distFolder), logMiddleware('After dist folder'));
    // app.use('/api', authMiddlewares);
    app.use('/api/employees', require('./api/employee'));
    app.use('/api/oauthServerCallback', redirectUrlFunction, (req, res) => {
        res.redirect('/');
    });
    app.get('/logout', logout);

    //Error handler for 500 res
    app.use(function _500ErrorMiddleware(err, req, res, next) {
        if (res.statusCode != 500) {
            return next(err);
        }
        res.sendfile("/home/sourabh/DTA/server/views/500.html");
    });

    // All undefined asset or api routes should return a 404

    app.route('/:url(api|auth|app|assets)/*')
        .get(errors[404]);

    //Error handler for 400 res
    app.use(function _400ErrorMiddleware(err, req, res, next) {
        res.sendfile("/home/sourabh/DTA/server/views/404.html");
    });
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
