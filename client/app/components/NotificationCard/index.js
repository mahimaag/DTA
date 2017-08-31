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
            partialLogs : 0,
            totalHours:0,
            missingLogs: new Date().getDate()
        }
    }

    componentWillReceiveProps(nextProps){
        let totalDays ;
        if(nextProps.month < new Date().getMonth()){
            totalDays = nextProps.days;
        }else if(nextProps.month === new Date().getMonth()){
           totalDays = new Date().getDate();
        }else{
            totalDays =0;
        }

        let totalHoursForDay = 0,totalMins = 0,localTotalHours= 0
        let localPartial = 0, localMissing = totalDays;


        if(nextProps.activity && nextProps.activity.activities.length >0){
                //calculate total hours completed on a day
                nextProps.activity.activities.map((activitites)=>{
                    activitites.activities.map((data)=>{
                        totalHoursForDay=totalHoursForDay+data.hh;
                        totalMins=totalMins+data.mm;
                        while(totalMins > 60){
                            totalHoursForDay=totalHoursForDay+1;
                            totalMins = totalMins-60
                        }
                    });
                    if( totalHoursForDay>=8 ){
                        localMissing = localMissing-1;
                    }
                    else if( totalHoursForDay > 0 && totalHoursForDay <8 ){
                        localMissing = localMissing-1;
                        localPartial = localPartial+1
                    }
                    localTotalHours = localTotalHours + totalHoursForDay;
                    totalHoursForDay = 0,totalMins = 0;
                });

                this.setState({
                    missingLogs:localMissing,
                    partialLogs:localPartial,
                    totalHours : localTotalHours
                });
            }
            else{
                this.setState({
                    missingLogs:nextProps.days,
                    partialLogs:0,
                    totalHours : 0
                });
            }

    }
  render(){

      let LogNotificationCardHOC = Authorization(LogNotificationCard, 'admin');
      let LogActivityCardHOC = Authorization(LogActivityCard, 'user');
    return(
      <div className="left-panel">
        {LogNotificationCardHOC && <LogNotificationCardHOC  missingLog={this.state.missingLogs} partialLog={this.state.partialLogs} totalHours={this.state.totalHours} month={this.props.month}/>}
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
