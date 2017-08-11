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
                employeeId: req.params.id,
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
                        "format": "%m/%d/%Y",
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
    ])
        .then(genericRepo.handleEntityNotFound(res))
        .then(genericRepo.respondWithResult(res))
        .catch(genericRepo.handleError(res));
}

export function save(req, res) {
    console.log("=======activity save called======");

    Activity.create(req.body)
        .then(output => {
            console.log("output=========>>>", output);
            if(req.body.hasOwnProperty("collaborators") && req.body.collaborators.length > 0) {
                req.body.collaborators.forEach(item => {
                    req.body.employeeId = item;
                    req.body.status = "Draft";
                    req.body.collaborators = [];

                    console.log("=======req.body=====", req.body);

                    Activity.create(req.body)
                        .then(r1 => {
                            console.log("activity cloned..", r1);
                        });
                });
               done();
            }
        })
        .catch(genericRepo.handleError(res))

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

