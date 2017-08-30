import { ActivityActions } from './../../constants/actions';
import {decoratedFetch } from "../config/network.config"
import { ApiResponseCode } from "../network/constants"
export const postActivities = (activityLog) => {
    return  (dispatch) => {
        decoratedFetch('/api/activity/employee',{body:activityLog})
            .then(response => {
                if (response.status == ApiResponseCode.OK) {
                    return response.json();
                } else if (response.status == ApiResponseCode.AUTH_FAIL) {
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            dispatch({type:ActivityActions.PostActivity.Success, data:data})
        })
            .catch(error => {
                dispatch({type:ActivityActions.PostActivity.Failure, error:error})
            })
    };
};
export const getActivities = () => {
    return (dispatch) => {
        decoratedFetch('/api/activity/employee',{method:'get'})
            .then(response => {
                if (response.status == ApiResponseCode.OK) {
                    return response.json();
                } else if (response.status == ApiResponseCode.AUTH_FAIL) {
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            dispatch({type:ActivityActions.GetActivity.Success, data:data})
        })
            .catch(error => {
                dispatch({type:ActivityActions.GetActivity.Failure, error:error})
            })
    }
};
export const deleteActivity = (activityId) => {
    return (dispatch) => {
        decoratedFetch(`/api/activity/${activityId}`,{method:'delete'})
            .then(response => {
                if (response.status == ApiResponseCode.OK) {
                    return response.json();
                } else if (response.status == ApiResponseCode.AUTH_FAIL) {
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            dispatch({type:ActivityActions.DeleteActivity.Success, data:data})
        })
            .catch(error => {
                dispatch({type:ActivityActions.DeleteActivity.Failure, error:error})
            })
    }
}
export const updateActivities = (activityLog) => {
    return (dispatch) => {
        decoratedFetch(`/api/activity/${activityLog._id}`,{method: 'put',body:activityLog})
            .then(response => {
                if (response.status == ApiResponseCode.OK) {
                    return response.json();
                } else if (response.status == ApiResponseCode.AUTH_FAIL) {

                }
            })
            .then((data) => {
                dispatch({type:ActivityActions.UpdateActivity.Success, data:activityLog})
            })
            .catch((error)=>{
                dispatch({type:ActivityActions.UpdateActivity.Failure, error:error})
            })
    }
};
export const deleteAllActivity = (date) => {
    return (dispatch) => {
        decoratedFetch(`/api/activity/employee/date/${date}`,{method:'delete'})
            .then(response => {
                if (response.status == ApiResponseCode.OK) {
                    return response.json();
                } else if (response.status == ApiResponseCode.AUTH_FAIL) {
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            dispatch({type:ActivityActions.DeleteAllActivity.Success, data:data})
        })
            .catch(error => {
                dispatch({type:ActivityActions.DeleteAllActivity.Failure, error:error})
            })

    }
};
export const searchActivity = (textValue) => {
    return (dispatch) => {
        decoratedFetch("/api/activity/searchActivity?activityName="+textValue,{method:'get'})
            .then(response => {
                if(response.status == ApiResponseCode.OK){
                    return response.json()
                }else if(response.status == ApiResponseCode.AUTH_FAIL){
                    //fetch(AUTHORIZE_URL)
                }
            }).then(data => {
              dispatch({type:ActivityActions.SearchActivity.Success, data:data.activities})
        })
            .catch(error => {
                dispatch({type:ActivityActions.SearchActivity.Failure,error:error})
            })
    }
};


