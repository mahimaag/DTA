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
                    console.log("hello------");
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            console.log("data----------", data)
        })
            .catch(error => {
                console.log(error)
            })};
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
            console.log("data----------", data)
        })
            .catch(error => {
                console.log(error)
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
                    console.log("hello------");
                    // fetch(AUTHORIZE_URL)
                }
            }).then(data => {
            console.log("data----------", data)
        })
            .catch(error => {
                console.log(error)
            })

    }
};