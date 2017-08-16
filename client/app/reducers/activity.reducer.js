
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
            console.log('get data in reducer ********', state,action.data);
            duplicateState.activities = action.data;
            break;
        case ActivityActions.GetActivity.Failure:
            duplicateState.error = action.error;
            break;

        case ActivityActions.GetActivity.Start:
            break;

        case ActivityActions.PostActivity.Success:
            //todo : push activity in its _id:date only  Action.data.date is timestamp and state is in mm/dd/yyyy format
             if(duplicateState && duplicateState.activities.length>0){
                 let flag = false;
                 duplicateState.activities.map((dates)=>{
                     if(dates._id === action.data.date) {
                         flag = true;
                         let index = duplicateState.activities.indexOf(dates);
                         console.log("index found is :",index);
                         duplicateState.activities[index].activities.push(action.data)
                     }
                     //todo : if no _id is matched
                 });
                 if(flag === false){
                     duplicateState.activities.push({
                         _id:action.data.date,
                         activities : [action.data]
                     })
                 }

             }else{
                    duplicateState.activities = [{
                        _id:action.data.date,
                        activities : [action.data]
                    }]
             }
             break;
        case ActivityActions.PostActivity.Failure:
            console.log('error in reducer');
            break;
        default:
            break;
    }
    return duplicateState;
};

export default ActivityReducer;
