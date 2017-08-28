import React, { Component } from 'react';
import { Link } from 'react-router';
import {Glyphicon} from 'react-bootstrap';

import LogNotificationCard from './../LogNotificationCard';
import LogActivityCard from './../LogActivityCard';
import LogProjectCard from './../LogProjectCard';

import {Authorization, Authorization2} from './../../Core/Authorization';

import styles from './style.css';
//import Authorization from "../../../utils/Authorization";

class NotificationCards extends Component{
    constructor(props){
        super(props);
        this.state = {
            missingLogs:new Date().getDate(),
            partialLogs : 0,
            totalHours:0
        }
    }

    componentWillReceiveProps(nextProps){
        console.log("cwrp in card",nextProps.activity);
        this.setState({
            missingLogs:new Date().getDate(),
            partialLogs : 0,
            totalHours:0
        },()=>{
            let totalHoursForDay = 0,totalMins = 0,localTotalHours= this.state.totalHours;
            let localPartial = this.state.partialLogs, localMissing = this.state.missingLogs;
            console.log("before 8 hours completed P/M ",localPartial,localMissing);
            if(nextProps.activity && nextProps.activity.activities.length >0){
                const timeLogs = this.props.activity.activities;
                console.log("========activities in landing page======",nextProps.activity);
                //calculate total hours completed on a day
                nextProps.activity.activities.map((activitites)=>{
                    activitites.activities.map((data)=>{
                        console.log("=======",data)
                        totalHoursForDay=totalHoursForDay+data.hh;
                        totalMins=totalMins+data.mm;
                        while(totalMins > 60){
                            totalHoursForDay=totalHoursForDay+1;
                            totalMins = totalMins-60
                        }
                    });
                     console.log(`total time for ${activitites._id} : ${totalHoursForDay}-${totalMins}`);
                    // console.log("before 8 hours completed P/M ",localPartial,localMissing)
                    if( totalHoursForDay>=8 ){
                        localMissing = localMissing-1;
                        console.log("when 8 hours is completed P/M",localPartial,localMissing)
                    }
                    else if( totalHoursForDay > 0 && totalHoursForDay <8 ){
                        localMissing = localMissing-1;
                        localPartial = localPartial+1
                        console.log("when less then 8 hours is completed P/M",localPartial,localMissing)
                    }
                    localTotalHours = localTotalHours + totalHoursForDay;
                    totalHoursForDay = 0,totalMins = 0;
                });

                console.log("total missing and partial logs are:",localPartial,localMissing)
                this.setState({
                    missingLogs:localMissing,
                    partialLogs:localPartial,
                    totalHours : localTotalHours
                },()=>{
                    console.log("total and partial logs are :",this.state.partialLogs,this.state.missingLogs)
                });
            }
        });
         // console.log("props in card",this.props)

    }
  render(){
        console.log("render in Card")
    //console.log(Authorization2, Authorization);
    let LogNotificationCardHOC = Authorization(LogNotificationCard, 'admin');
    let LogActivityCardHOC = Authorization(LogActivityCard, 'user');
    return(
      <div className="left-panel">
        {LogNotificationCardHOC && <LogNotificationCardHOC  missingLog={this.state.missingLogs} partialLog={this.state.partialLogs} totalHours={this.state.totalHours}/>}
        <br/>
        <Authorization2 allowedRoles = {['admin', 'user']} user={{role:"undefined"}}>
          <LogNotificationCard dueDate="24" month="Jul" missingLog="8" partialLog="3"/>
        </Authorization2>
        <Authorization2 allowedRoles = {['admin', 'user']} user={{role:"user"}}>
        <LogActivityCard activityCount="2"/>
        </Authorization2>
        <br/>
        <LogProjectCard numProjects="2"/>
      </div>
    );
  }
}

export default NotificationCards;

//                <LogNotificationCard dueDate="24" month="Jul" missingLog="10" partialLog="3"/>
//        <LogNotificationCardHOC dueDate="24" month="Jul" missingLog="10" partialLog="3" />
