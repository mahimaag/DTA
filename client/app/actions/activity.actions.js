import { ActivityActions } from './../../constants/actions';

export const postActivities = (activityLog) => {
    console.log("activity received is :",activityLog)
    return (dispatch) => {
        dispatch({type:ActivityActions.PostActivity.Start});
        fetch("/api/activity",{
            method: 'post',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify(activityLog)
        })
            .then(response => response.json())
            .then((data) => {
                dispatch({type:ActivityActions.PostActivity.Success})
            })
            .catch((error)=>{
                dispatch({type:ActivityActions.PostActivity.Failure})

            })
    }
};
