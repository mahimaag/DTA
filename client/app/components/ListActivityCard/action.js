import { ActivityActions } from './../../../constants/actions';
import mockActivities from './../../../assests/SampleData';

export const getActivities = () => {
    return (dispatch) => {
        setTimeout(() => dispatch({type: ActivityActions.GetActivity.Success, data: mockActivities}), 500)
    }
};

