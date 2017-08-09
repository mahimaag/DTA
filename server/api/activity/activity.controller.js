'use strict';

import Activity from './activity.model';
var genericRepo = require("../generic/genericRepo");
import mongoose from "mongoose";

// Gets a single Employee from the DB
export function show(req, res) {
    console.log("=======activity show called======");
    let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth(),
        firstDate = new Date(y, m ,1).getTime(),
        lastDate = new Date(y, m + 1, 0).getTime();

    console.log("=======first Date===>>>", firstDate);
    console.log("=======last Date===>>>", lastDate);
    return Activity.aggregate([
            {
                $match: {
                    employeeId: req.params.empid,
                    date: {
                        $lte: lastDate, // last date of current month
                        $gte: firstDate // first date of current month
                    }
                }
            },
            {
                $project: {
                    "dateString": {
                        $dateToString: {
                            "format": "%d/%m/%Y",
                            "date": {
                                $add: [new Date(0), "$date"]
                            }
                        }
                    },
                    activity: 1,
                    activityType: 1,
                    description: 1,
                    status: 1,
                    collaborators: 1,
                    duration: 1,
                    _id: 1

                }
            },
            {
                $group: {
                    _id: "$dateString",
                    "activities": {
                        $push: {
                            "Id": "$_id",
                            "Activity":"$activity",
                            "Type": "$activityType",
                            "Duration": "$duration",
                            "Description": "$description",
                            "Status": "$status",
                            "Collaborators": "$collaborators"
                        }
                    }
                }
            }
        ]

    )
        .then(genericRepo.handleEntityNotFound(res))
        .then(genericRepo.respondWithResult(res))
        .catch(genericRepo.handleError(res));
}

export function save(req, res) {
    console.log("=======activity save called======");

    let activity = new Activity({
        employeeId: req.body.employeeId,
        date: req.body.date,
        duration: req.body.duration,
        activity: req.body.activity,
        activityType: req.body.activityType,
        description: req.body.description,
        status: req.body.status,
        collaborators: req.body.collaborators
    });

    activity.save((err, output) => {
        if(err) {
            console.log("err=====>>>>>>", err);
            res.status(500).send({err: "error while saving data", error: err});
        }
        res.status(200).send({msg: "Activity successfully added.", id: output._id});
    });

    console.log("======activity saved====");
}

export function upsert(req, res) {
    console.log("=======activity upsert called======");

    return Activity.findOneAndUpdate({_id: req.params.id}, req.body,
        {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
        .then(genericRepo.respondWithResult(res))
        .catch(genericRepo.handleError(res));

}

export function destroy(req, res) {
    console.log("=======activity upsert called======");
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        Activity.findOneAndRemove({_id: req.params.id})
            .then(doc => {
                let response = {
                    message: "activity successfully deleted",
                    id: doc._id
                };
                res.send(response);
            });
    } else {
        res.send({err: "Invalid activity id"});
    }
}

