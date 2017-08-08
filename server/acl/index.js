"use strict";
import logger from './../components/logger';
let ACLs = require('./../config/role.constants');
// http_method http://domain:port/resource/:role

/**
 * A function that tells whether the requested operation is permitted to the user. If permitted returns true, otherwise false.
 * @param {object} httpRequest
 * @param {string} userRole
 * @param {object} acl
 * @return {boolean} isPermitted
 * */
let isActionPermitted = ((httpRequest = null, userRole = '', acl = '') => {
    let isPermitted = false;
    if(!httpRequest || !userRole ||!acl) return isPermitted;
    let splittedUrl = httpRequest.url.split('/');
    let _resource = splittedUrl[2];
    logger.silly(`An ${userRole} is trying to access ${httpRequest.method} method of ${_resource} resource`)
    let roleForAcl = acl[userRole];
    if(!roleForAcl) return isPermitted;
    let permittedResource = roleForAcl.find(permission => permission.resource === _resource || permission.resource == "*");
    if(!permittedResource)  return isPermitted;
    isPermitted = permittedResource.operations.find(operation => operation === '*' || operation === httpRequest.method);
    return !!isPermitted;
});

module.exports = (req, res, next) => {
    if(!isActionPermitted(req, req.params.role , ACLs)){
        logger.silly('Access denied')
        return res.status(401).end('Access denied');
    }
    next();
};