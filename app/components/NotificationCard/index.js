import React, { Component } from 'react';
import { Link } from 'react-router';
import {Glyphicon} from 'react-bootstrap';

import LogNotificationCard from './../LogNotificationCard';
import LogActivityCard from './../LogActivityCard';
import LogProjectCard from './../LogProjectCard';

import styles from './style.css';

class NotificationCards extends Component{
    render(){
        return(
            <div className="left-panel">
                <LogNotificationCard dueDate="24" month="Jul" missingLog="10" partialLog="3"/>
                <br/>
                <LogActivityCard activityCount="2"/>
                <br/>
                <LogProjectCard numProjects="2"/>
            </div>
        );
    }
}

export default NotificationCards;

