'use strict';

var express = require('express');
var controller = require('./activity.controller');
var service = require("./activity.service");

const router = express.Router();

router.get(
    "/employee",
    service.validateEmpId,
    controller.getActivities
);

router.post(
    "/employee",
    service.addEmployeeId,
    controller.saveActivities
);

router.put(
    "/:id",
    service.validateActivityId,
    controller.updateActivity
);

router.delete(
    "/:id",
    service.validateActivityId,
    controller.deleteActivity
);

router.delete(
    "/employee/:id",
    service.validateEmpId,
    controller.deleteActivityByEmp
);

module.exports = router;