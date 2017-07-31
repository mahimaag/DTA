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
  render(){
    //console.log(Authorization2, Authorization);
    let LogNotificationCardHOC = Authorization(LogNotificationCard, 'admin');
    let LogActivityCardHOC = Authorization(LogActivityCard, 'user');
    return(
      <div className="left-panel">
        {LogNotificationCardHOC && <LogNotificationCardHOC dueDate="24" month="Jul" missingLog="10" partialLog="3" />}
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
