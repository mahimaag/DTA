'use strict';

import Activity from './activity.model';
var genericRepo = require("../generic/genericRepo");
import Q from "q";

export function getActivities(req, res) {
    console.log("======actvity controller // getActivities()=========", req.query);

    let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth(), firstDate, lastDate, employeeId;

    if (req.query.hasOwnProperty("month") &&
        typeof req.query.month === "string" && !isNaN(parseInt(req.query.month))) {

        m = parseInt(req.query.month)
    }
    firstDate = new Date(y, m, 1).getTime();
    lastDate = new Date(y, m + 1, 0).getTime();

    console.log("=======first Date===>>>", firstDate);
    console.log("=======last Date===>>>", lastDate);
    return Activity.aggregate([
        {
            $match: {
                employeeId: parseInt(req.employeeId),
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
                        "_id": "$_id",
                        "activityType": "$activityType",
                        "hh": "$hh",
                        "mm": "$mm",
                        "description": "$description",
                        "status": "$status",
                        "collaborators": "$collaborators"
                    }
                }
            }
        }
    ])
        .then(genericRepo.respondWithResult(res))
        .catch(genericRepo.handleError(res));
}

export function saveActivities(req, res) {
    console.log("======actvity controller // saveActivities()=========");
    let response = [];
    Activity.create(req.body)
        .then(output => {

            if (iscollaborators(req)) {
                addCollaborators(req)
                    .then(result => {
                        if (result) {
                            console.log("collaborators added successfully..");
                        }
                    });
            }

            if (isRepeatActivity(req)) {
                repeatActivity(req)
                    .then(result => {
                        if (result) {
                            response = result.concat(output);
                            console.log("activity repeated successfully..");
                            console.log("final response==>>>", response);
                            res.status(200).json(response).end();
                        }
                    });
            } else {
                response.push(output);
                console.log("final else response==>>>", response);
                res.status(200).json(response).end();
            }

        })
        .catch(genericRepo.handleError(res));
}

function addCollaborators(req) {
    let defered = Q.defer(),
        collaborators = req.body.collaborators;

    collaborators.forEach((item, index) => {
        req.body.employeeId = item;
        req.body.status = "Draft";
        req.body.collaborators = [];

        console.log("=======req.body=====", req.body);

        Activity.create(req.body)
            .then(result => {
                console.log("activity cloned..", result);
            })
            .catch(err => {
                defered.reject(err);
            });

        if (index === collaborators.length - 1) {
            defered.resolve(true);
        }

    });

    return defered.promise;
}

function repeatActivity(req) {
    let defered = Q.defer(),
        dates = req.body.repeatActivity,
        output = [];

    dates.forEach((date, index) => {
        req.body.date = date;

        console.log("=======req.body=====", req.body);

        Activity.create(req.body)
            .then(result => {
                console.log("repeated activity cloned..", result);
                output.push(result);
                if (index === dates.length - 1) {
                    console.log("========promise resolve=====>>>", index, dates.length);
                    defered.resolve(output);
                }
            })
            .catch(err => {
                defered.reject(err);
            });
    });

    return defered.promise;
}

function iscollaborators(req) {
    return req.body.hasOwnProperty("collaborators") &&
        Array.isArray(req.body.collaborators) &&
        req.body.collaborators.length > 0;
}

function isRepeatActivity(req) {
    return req.body.hasOwnProperty("repeatActivity") &&
        Array.isArray(req.body.repeatActivity) &&
        req.body.repeatActivity.length > 0;
}

export function updateActivity(req, res) {
    console.log("======actvity controller // updateActivity()=========", req.params, req.body);

    return Activity.findOneAndUpdate({_id: req.params.id}, req.body,
        {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
        .then(genericRepo.respondWithResult(res))
        .catch(genericRepo.handleError(res));

}

export function deleteActivity(req, res) {
    console.log("======actvity controller // deleteActivity()=========");

    Activity.findByIdAndRemove(req.params.id)
        .then(genericRepo.respondWithResult(res))
        .catch(genericRepo.handleError(res));
}

export function deleteActivityByEmp(req, res) {
    console.log("======actvity controller // deleteActivityByEmp()=========", req.params.date, req.employeeId, typeof req.params.date,
        typeof req.employeeId, parseInt(req.employeeId), parseInt(req.params.date));

    if (req.params.hasOwnProperty("date")) {
        console.log("------if-------------");
        Activity.remove({employeeId: parseInt(req.employeeId), date: parseInt(req.params.date)})
            .then(ressult => {
                let response = {
                    date: req.params.date
                };
                res.status(200).send(response);
            })
            .catch(genericRepo.handleError(res));

    } else {
        console.log("------else-------------");
        genericRepo.badInput(res, 500);
    }
}

export function getSearchedActivity(req, res) {
    let date = new Date();
    let m = date.getMonth();
    let y = date.getFullYear();
    let firstDate = new Date(y, m, 1).getTime();
    let lastDate = new Date(y, m + 1, 0).getTime();
    const searchValue = req.query.activityName;
    const regex = new RegExp(`.*${searchValue}.*`);

    Activity.find(
                 {
                    $or:[
                            { $and: [ {activityType: { $regex: regex, $options: "sxi" } },
                            { date: {
                                $lte: lastDate,
                                $gte: firstDate
                            } }, { employeeId: parseInt(req.employeeId) } ] }
                            ,
                            { $and : [ {description: { $regex: regex, $options: "sxi" } },
                            { date: {
                                $lte: lastDate,
                                $gte: firstDate
                            } },{ employeeId: parseInt(req.employeeId) } ] }

                       ]
                   }
                  )
                .then(activities => {
                    res.send({activities})
        })
        .catch(genericRepo.handleError(res))

}
