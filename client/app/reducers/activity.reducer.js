
import { ActivityActions } from './../../constants/actions';
import _ from 'lodash';

// Represents an activity object and its current state.
const initialState = {
    activities: [],                // activities Array from Apis.
    error: {}                  // error from Apis.
};

const ActivityReducer = (state = initialState, action) => {
    let duplicateState = _.cloneDeep(state);
    switch (action.type) {
        case ActivityActions.GetActivity.Success:
            duplicateState.activities = action.data;
            break;
        case ActivityActions.GetActivity.Failure:
            duplicateState.error = action.error;
            break;

        case ActivityActions.GetActivity.Start:
            break;

        case ActivityActions.PostActivity.Success:
            console.log('data in action',duplicateState.activities,action.data);
             if(duplicateState && duplicateState.activities.length>0){
                 if(action.data.repeatActivity.length >0){
                     console.log("repeated dates in reducer are :",action.data.repeatActivity);
                     action.data.repeatActivity.map((repeatedDate) => {
                         let index3 = duplicateState.activities.findIndex((dates)=> dates._id === repeatedDate);
                         if(index3>=0){
                             duplicateState.activities[index3].activities.push(action.data);
                         }else{
                             duplicateState.activities.push({
                                 _id:repeatedDate,
                                 activities : [action.data]
                             })
                         }
                     } )
                 }
                 let index = duplicateState.activities.findIndex((dates)=> dates._id === action.data.date);
                 if(index>=0){
                     duplicateState.activities[index].activities.push(action.data);
                 } else{
                     duplicateState.activities.push({
                         _id:action.data.date,
                         activities : [action.data]
                     })
                 }
             } else{
                    duplicateState.activities = [{
                        _id:action.data.date,
                        activities : [action.data]
                    }]
             }
             console.log("data added in reducer is :",action.data,duplicateState);
             break;
        case ActivityActions.PostActivity.Failure:
            console.log('error in reducer');
            break;
        case ActivityActions.UpdateActivity.Success:
            console.log('action.data in reducer----',action.data);
            if(duplicateState && duplicateState.activities.length>0){
                duplicateState.activities.map((activity) => {
                       if(activity.activityId === action.data.activityId){
                           activity = action.data;
                       }
                })
            }
            break;
        case ActivityActions.UpdateActivity.Failure:
            console.log('error in reducer');
            break;

        case ActivityActions.DeleteActivity.Success:
            console.log("Deleteing activity with id :",action.data,duplicateState.activities);
            if(duplicateState && duplicateState.activities.length>0) {
                let index = duplicateState.activities.findIndex((dates) => dates._id === action.data.date);
                console.log("delete index 1:",index);
                if (index >= 0) {
                    let index2 = duplicateState.activities[index].activities.findIndex((activity) => activity._id === action.data._id)
                    console.log("delete index 2",index2);
                    if(index2>=0)
                        duplicateState.activities[index].activities.splice(index2,1)
                    }
                }
                console.log('data after deletion',duplicateState.activities);
            break;

        case ActivityActions.DeleteActivity.Failure:
            console.log('error in reducer');
            break;

        default:
            break;
    }

    return duplicateState;
};

export default ActivityReducer;
