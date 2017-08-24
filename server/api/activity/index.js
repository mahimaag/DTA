'use strict';

var express = require('express');
var controller = require('./activity.controller');
var service = require("./activity.service");

let router = express.Router(),
    activityRouter = router.route('/:id');


activityRouter
    .get(service.validateInput)
    .get(controller.show);

activityRouter
    .post(service.validateInput)
    .post(service.buildActivity)
    .post(controller.save);

activityRouter
    .put(service.validateInput)
    .put(controller.upsert);

activityRouter
    .delete(service.validateInput)
    .delete(controller.destroy);

module.exports = router;