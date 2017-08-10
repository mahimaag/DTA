"use strict";

var genericRepo = require("../generic/genericRepo");

export function validateInput(req, res, next) {
    console.log("======checking parameter=========");
    console.log("req========", req.params);
    if(req.params.hasOwnProperty("id")) {
        next();
    } else {
        genericRepo.badInput(res, 500);
    }
}