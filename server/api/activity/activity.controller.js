'use strict';

import Activity from './activity.model';
var genericRepo = require("../generic/genericRepo");
import mongoose from "mongoose";

// Gets a single Employee from the DB
export function show(req, res) {
    console.log("======actvity controller // show()=========");
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
            $group: {
                _id: "$date",
                "activities": {
                    $push: {
                        "activityId": "$_id",
                        "activity":"$activity",
                        "activityType": "$activityType",
                        "duration": "$duration",
                        "description": "$description",
                        "status": "$status",
                        "collaborators": "$collaborators"
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
    console.log("======actvity controller // save()=========");

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

            }
            res.status(200).json(output).end();
        })
        .catch(genericRepo.handleError(res));
}

export function upsert(req, res) {
    console.log("======actvity controller // upsert()=========");

    return Activity.findOneAndUpdate({_id: req.params.id}, req.body,
        {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
        .then(genericRepo.respondWithResult(res))
        .catch(genericRepo.handleError(res));

}

export function destroy(req, res) {
    console.log("======actvity controller // destroy() //Single Activity=========");
    if(mongoose.Types.ObjectId.isValid(req.params.id)) {
        Activity.findOneAndRemove({_id: req.params.id})
            .then(doc => {
                let response = {
                    message: "activity successfully deleted",
                    id: doc._id,
                    date :doc.date
                };
                res.send(response);
            });
    } else if(req.body.hasOwnProperty("date")) {
        console.log("======actvity controller // destroy() // Date wise=========", req.params.id,
            req.body);
        Activity.remove({employeeId: req.params.id, date: req.body.date})
            .then(doc => {
                res.send(deleteResponse(doc, false));
            })
            .catch(err => {
                res.send(deleteResponse(err, true));
            })

    } else {
        res.send(deleteResponse(null, true));
    }
}

function deleteResponse(doc, isErr) {
    let response = {};

    if (isErr) {
        response.err = "Invalid activity id";
    } else {
        response.message = "activity successfully deleted",
            response.id = doc._id,
            response.date = doc.date

    };
    return response;
}

