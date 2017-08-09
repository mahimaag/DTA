'use strict';

import Activity from './activity.model';
var genericRepo = require("../generic/genericRepo");

// Gets a single Employee from the DB
export function show(req, res) {
    console.log("=======activity show called======");

    return Activity.find({employeeId: req.params.empid})
        .then(genericRepo.handleEntityNotFound(res))
        .then(genericRepo.respondWithResult(res))
        .catch(genericRepo.handleError(res));
}

export function save(req, res) {
    console.log("=======activity save called======");

    let activity = new Activity({
        employeeId: req.body.employeeId,
        date: req.body.date || new Date().getTimes(),
        duration: req.body.duration,
        activity: req.body.activity,
        activityType: req.body.activityType,
        description: req.body.description,
        status: req.body.status,
        updatedDate: new Date().getTime()
    });

    activity.save((err, output) => {
        if(err) {console.log("err=====>>>>>>", err);}
        res.status(200).end();
    });

    console.log("======activity saved====");
}

export function upsert(req, res) {
    console.log("=======activity upsert called======");

    return Activity.findOneAndUpdate({_id: req.params.id}, req.body,
        {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));

}

export function destroy(req, res) {
    console.log("=======activity upsert called======");

    Activity.findOneAndRemove({_id: req.params.id})
        .then(doc => {
        let response = {
            message: "activity successfully deleted",
            id: doc._id
        };
        res.send(response);
    });

}

