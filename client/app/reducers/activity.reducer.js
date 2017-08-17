
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
            console.log('action.data in reducer----',action.data);
             if(duplicateState && duplicateState.activities.length>0){
                 let index = duplicateState.activities.findIndex((dates)=> dates._id === action.data.date);
                 if(index>=0){
                     console.log("index is:",index)
                     duplicateState.activities[index].activities.push(action.data)
                     console.log('duplicateState----',duplicateState);
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
        default:
            break;
    }
    return duplicateState;
};

export default ActivityReducer;
