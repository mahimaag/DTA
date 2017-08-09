"use strict";

export function handleEntityNotFound(res) {
    return function(entity) {
        if(!entity || entity.length === 0) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

export function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

export function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if(entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}


