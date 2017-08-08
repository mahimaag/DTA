'use strict';

var express = require('express');
var controller = require('./activity.controller');

var router = express.Router();

router.get('/:empid', controller.show);

router.post('/:empid', controller.save);

//router.put('/:id', controller.upsert);

//router.delete('/:id', controller.destroy);

module.exports = router;