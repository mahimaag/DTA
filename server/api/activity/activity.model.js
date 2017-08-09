'use strict';

import mongoose from 'mongoose';
// import {registerEvents} from './employee.events';


const ActivitySchema = new mongoose.Schema({
    activityId: {
        type: Number
    },
    employeeId:{
        type:String,
    },
    date:{
        type: Number
    },
    duration: {
        type: String
    },
    activity: {
        type: String
    },
    activityType: {
        type: String
    },
    description: {
        type: String
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


});


// registerEvents(EmployeeSchema);
module.exports=mongoose.model('Activity', ActivitySchema);
