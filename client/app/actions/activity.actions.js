import { ActivityActions } from './../../constants/actions';
import {decoratedFetch } from "../config/network.config"
import fetch from "isomorphic-fetch"
import { ApiResponseCode } from "../network/constants"
const AUTHORIZE_URL = "http://newers-world-oauth.qa2.tothenew.net/oauth/authorize?client_id=e6d6a83e-6c7a-11e7-9394-406186be844b";

export const postActivities = (activityLog) => {
    return  (dispatch) => {
        decoratedFetch('/api/activity/employee',{body:activityLog})
            .then(response => {
                if (response.status == ApiResponseCode.OK) {
                    return response.json();
                } else if (response.status == ApiResponseCode.AUTH_FAIL) {
                    console.log("hello------");
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            dispatch({type:ActivityActions.PostActivity.Success, data:data})
        })
            .catch(error => {
                console.log(error)
                dispatch({type:ActivityActions.PostActivity.Failure})
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
                    console.log("hello------");
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            dispatch({type:ActivityActions.GetActivity.Success, data:data})
        })
            .catch(error => {
                console.log(error)
                dispatch({type:ActivityActions.GetActivity.Failure})
            })
    }
};
export const deleteActivity = (activityId) => {
    console.log(activityId,"delete")
    return (dispatch) => {
        decoratedFetch(`/api/activity/${activityId}`,{method:'delete'})
            .then(response => {
                if (response.status == ApiResponseCode.OK) {
                    return response.json();
                } else if (response.status == ApiResponseCode.AUTH_FAIL) {
                    console.log("hello------");
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            dispatch({type:ActivityActions.DeleteActivity.Success, data:data})
        })
            .catch(error => {
                dispatch({type:ActivityActions.DeleteActivity.Failure})
            })
    }
}
export const updateActivities = (activityLog) => {
    console.log("************id in update*********",activityLog._id);

    return (dispatch) => {
        decoratedFetch(`/api/activity/${activityLog._id}`,{method: 'put',body:activityLog})
            .then(response => {
                if (response.status == ApiResponseCode.OK) {
                    return response.json();
                } else if (response.status == ApiResponseCode.AUTH_FAIL) {
                    console.log("hello------")
                }
            })
            .then((data) => {
                dispatch({type:ActivityActions.UpdateActivity.Success, data:activityLog})
            })
            .catch((error)=>{
                console.log('errorrrrrrrr',error)
                dispatch({type:ActivityActions.UpdateActivity.Failure})
            })
    }
}


export const deleteAllActivity = (date) => {
    return (dispatch) => {
        decoratedFetch(`/api/activity/employee/date/${date}`,{method:'delete'})
            .then(response => {
                if (response.status == ApiResponseCode.OK) {
                    return response.json();
                } else if (response.status == ApiResponseCode.AUTH_FAIL) {
                    console.log("hello------");
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            dispatch({type:ActivityActions.DeleteAllActivity.Success, data:data})
        })
            .catch(error => {
                dispatch({type:ActivityActions.DeleteAllActivity.Failure})
            })

    }
}


