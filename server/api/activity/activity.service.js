"use strict";

var genericRepo = require("../generic/genericRepo");

export function validateInput(req, res, next) {
    console.log("======actvity service // validateInput()=========");
    if(req.params.hasOwnProperty("id") && req.hasOwnProperty("body")) {
        next();
    } else {
        genericRepo.badInput(res, 500);
    }
}

export function buildActivity(req, res, next) {
    console.log("======actvity service // buildActivity()=========");
        req.body.employeeId = req.params.id;
        next();

}