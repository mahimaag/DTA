/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { Row, Col} from 'react-bootstrap'
import { TSMS_TextButton } from './../../Core/Button'

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
        //console.log('total time is =',totalTime);
        return(
            <Row className="show-grid">
                <Col md={2} lg={2} className="log-col">
                    <span className="log-date-day">{this.props.logDate}</span>
                    <span className="log-date-day">thu</span>
                </Col>
                <Col md={1} lg={1} lgOffset={1} className="log-col">
                    <span>{totalTime} Hrs</span>
                </Col>
                <Col md={4} lg={4} lgOffset={4} className="log-col">
                    <TSMS_TextButton bClassName="log-clear-button"
                                     onClickFunc={this.props.onLogTimeClick}
                                     dispName="Log Time"/>

                    <TSMS_TextButton bClassName="log-clear-button"
                                     onClickFunc={this.props.onClearClick}
                                     dispName="Clear"/>


                </Col>
            </Row>
        );
    }
}

export default ActivityLogHeader