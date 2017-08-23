import { ActivityActions } from './../../constants/actions';
import {decoratedFetch } from "../config/network.config"
import fetch from "isomorphic-fetch"
import { ApiResponseCode } from "../network/constants"
const AUTHORIZE_URL = "http://newers-world-oauth.qa2.tothenew.net/oauth/authorize?client_id=e6d6a83e-6c7a-11e7-9394-406186be844b";
export const postActivities = (activityLog) => {
   /* return  (dispatch) => {
                     decoratedFetch('http://rest.learncode.academy/api/manoj/users',{method:'get'})
                       .then(response=>{
                           if(response.status == ApiResponseCode.OK){
                                return response.json();
                           }else if(response.status == ApiResponseCode.AUTH_FAIL){
                               fetch(AUTHORIZE_URL)
                           }
                       }).then(data=>{
                           console.log("data----------",data)
                         })
                       .catch(error=>{
                          console.log(error)
                       })
          };*/
    return (dispatch) => {
        fetch("/api/activity/2592",{
            method: 'post',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify(activityLog)
        })
            .then(response => response.json())
            .then((data) => {
                dispatch({type:ActivityActions.PostActivity.Success, data:data})
            })
            .catch((error)=>{
                dispatch({type:ActivityActions.PostActivity.Failure})

            })
    }
};

export const getActivities = () => {
    return (dispatch) => {
        fetch("/api/activity/2592",{
            method: 'get',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            }
        })
            .then(response => response.json())
            .then((data) => {
                dispatch({type:ActivityActions.GetActivity.Success,data:data})
            })
            .catch((error)=>{
                dispatch({type:ActivityActions.GetActivity.Failure})

            })
    }
};

export const updateActivities = (activityLog) => {
    console.log("************id in update*********",activityLog._id);

    return (dispatch) => {
        fetch(`/api/activity/${activityLog._id}`,{
            method: 'put',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify(activityLog)
        })
            .then(response => response.json())
            .then((data) => {
                console.log('put success', data)
                dispatch({type:ActivityActions.UpdateActivity.Success, data:activityLog})
            })
            .catch((error)=>{
                console.log('errorrrrrrrr',error)
                dispatch({type:ActivityActions.UpdateActivity.Failure})

            })
    }
}

export const deleteActivity = (activityId) => {
    return (dispatch) => {
        fetch(`/api/activity/${activityId}`,{
            method:'delete',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            }
        })
            .then(response => response.json())
            .then((data) => {
                dispatch ({type:ActivityActions.DeleteActivity.Success,data:data})
            })
            .catch((error) => {
                dispatch({type:ActivityActions.DeleteActivity.Failure})
            })
    }
}