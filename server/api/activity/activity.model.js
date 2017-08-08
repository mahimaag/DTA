'use strict';

import mongoose from 'mongoose';
// import {registerEvents} from './employee.events';


const ActivitySchema = new mongoose.Schema({
    employeeId:{
        type:String,
    },
    employeeEmail:{
        type:String,
    },
    date:{
        type: Number
    },
    dureation: {
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
    createdDate: {
        type: Number
    },
    updatedDate: {
        type: Number
    }


});


// registerEvents(EmployeeSchema);
module.exports=mongoose.model('Activity', ActivitySchema);
