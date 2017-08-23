'use strict';

import mongoose from 'mongoose';
// import {registerEvents} from './employee.events';


const ActivitySchema = new mongoose.Schema({
    employeeId:{
        type:Number,
        required: true
    },
    date:{
        type: Number,
        required: true,
        default: new Date().getTime()
    },
    hh: {
        type: Number,
        required: true,
        default: 0
    },
    mm: {
        type: Number,
        required: true,
        default: 0
    },
    activityType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Submitted"
    },
    status: {
        type: String
    },
    collaborators: {
        type: Array
    },
    updatedDate: {
        type: Number,
        default: new Date().getTime()
    },
    createdDate: {
        type: Number,
        default: new Date().getTime()
    },
    isProject: {
        type: Number,
        default: 1
    }
}, {versionKey: false});


// registerEvents(EmployeeSchema);
module.exports=mongoose.model('Activity', ActivitySchema);
