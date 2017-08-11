'use strict';

import mongoose from 'mongoose';
// import {registerEvents} from './employee.events';


const ActivitySchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required: true
    },
    date:{
        type: Number,
        required: true,
        default: new Date().getTime()
    },
    duration: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
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
        type: Number
    }
}, {versionKey: false});


// registerEvents(EmployeeSchema);
module.exports=mongoose.model('Activity', ActivitySchema);
