
import { ActivityActions } from './../../constants/actions';
import _ from 'lodash';

// Represents an activity object and its current state.
const initialState = {
    activities: [],                // activities Array from Apis.
    error: {}                  // error from Apis.
};

const ActivityReducer = (state = initialState, action) => {
    let duplicateState = _.cloneDeep(state);
    console.log('11111111111111111')
    switch (action.type) {
        case ActivityActions.GetActivity.Success:
            console.log('reducer--------', state)
            duplicateState.activities = action.data;
            break;
        case ActivityActions.GetActivity.Failure:
            duplicateState.error = action.error;
            break;

        case ActivityActions.GetActivity.Start:
            break;

        case ActivityActions.PostActivity.Success:
            console.log("adding data in reducer *******",action.data)
            /*return{
                ...state,
                activities:
            };*/
            duplicateState.activities && duplicateState.activities[0].activities.push(action.data);
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
