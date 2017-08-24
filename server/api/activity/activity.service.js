"use strict";

var genericRepo = require("../generic/genericRepo");

import mongoose from "mongoose";

export function validateEmpId(req, res, next) {
    console.log("employeeid------",req.employeeId);
    if(req.employeeId){
        next();
    }else{
        genericRepo.badInput(res,500);
    }
}

export function validateActivityId(req, res, next) {
    console.log("======actvity service // validateActivityId()=========");
    if(req.params.hasOwnProperty("id") && mongoose.Types.ObjectId.isValid(req.params.id)) {
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

export function addEmployeeId(req,res,next) {
     if(req.employeeId){
        req.body.employeeId=req.employeeId;
        next();
    }else{
         genericRepo.badInput(res,500);
     }

}
