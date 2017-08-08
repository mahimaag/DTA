'use strict';

import Activity from './activity.model';
var genericRepo = require("../generic/genericRepo");

// Gets a single Employee from the DB
export function show(req, res) {
    console.log("=======activity show called======");
    return Activity.find({employeeId: req.params.empid}).exec()
        .then(genericRepo.handleEntityNotFound(res))
        .then(genericRepo.respondWithResult(res))
        .catch(genericRepo.handleError(res));
}

export function save(req, res) {
    console.log("=======activity save called======");

    let activity = new Activity({
      employeeId: req.body.employeeId,
        employeeEmail: req.body.employeeEmail,
        date: req.body.date || new Date().getTimes(),
        duration: req.body.duration,
        activity: req.body.activity,
        activityType: req.body.activityType,
        description: req.body.description,
        status: req.body.status,
        createdDate: new Date().getTime(),
        updatedDate: new Date().getTime()
    });

    activity.save((err, output) => {
        if(err) {console.log("err=====>>>>>>", err);}
        console.log("output===>>>>", output);
    });

    console.log("======activity saved====");
}

