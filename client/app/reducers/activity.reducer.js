
import { ActivityActions } from './../../constants/actions';
import _ from 'lodash';

// Represents an activity object and its current state.
const initialState = Object.freeze({
    activities: [],                // activities Array from Apis.
    error: {}                  // error from Apis.
});

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
        default:
            break;
    }
    return duplicateState;
};

export default ActivityReducer;
