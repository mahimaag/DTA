/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { Row, Col} from 'react-bootstrap'
//import { TSMS_TextButton } from './../../Core/Button'
import TtnButton from 'core/Button/btn';
import {monthArray} from '../../../constants/Index'


class ActivityLogHeader extends Component{
    render(){
        let activityArray = this.props.activities;
        let totalTime = 0;
        activityArray.map((activity) => {
            if(activity.Duration == '30 mins'){
                totalTime = totalTime + 0.5;
            }
            else{
                let duration = activity.Duration.split(' ');
                let timeLog = parseInt(duration[0]);
                totalTime = totalTime + timeLog;
            }
        })
        let month = '';
        let str = this.props.logDate.split('/');

        /*const monthArray = [{num:"01",month:"January"},{num:"02",month:"February"},
            {num:"03",month:"March"},{num:"04",month:"April"},
            {num:"05",month:"May"},{num:"06",month:"June"},
            {num:"07",month:"July"},{num:"08",month:"August"},
            {num:"09",month:"September"},{num:"10",month:"October"},
            {num:"11",month:"November"},{num:"12",month:"December"}];*/

        monthArray.forEach((item) => {
            (item.num === str[1])?month = item.month:null
        });

        let newDate = month + ' ' + str[0] + ',' + str[2];
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let logDate = new Date(newDate);
        let logDay = days[logDate.getDay()];

        return(
            <Row className = "show-grid">
                <Col md = {2} lg = {2} className = "log-col">
                    <span className = "log-date-day">{this.props.logDate}</span>
                    <span className = "log-date-day">{logDay}</span>
                </Col>
                <Col md = {1} lg = {1} lgOffset = {1} className = "log-col">
                    <span>{totalTime} Hrs</span>
                </Col>
                <Col md = {4} lg = {4} lgOffset = {4} className = "log-col">
                    <TtnButton bClassName = "log-clear-button"
                               level = "primary"
                               title = "Log Time"
                               onClick = {this.props.onLogTimeClick}/>

                    <TtnButton bClassName = "log-clear-button"
                               level = "primary"
                               title = "Clear"
                               onClick = {this.props.onClearClick}/>
                    {/*<TSMS_TextButton bClassName="log-clear-button"
                                     onClickFunc={this.props.onLogTimeClick}
                                     dispName="Log Time"/>

                    <TSMS_TextButton bClassName="log-clear-button"
                                     onClickFunc={this.props.onClearClick}
                                     dispName="Clear"/>*/}


                </Col>
            </Row>
        );
    }
}

export default ActivityLogHeader