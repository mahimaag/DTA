/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ActivityLogComp from '../ActivityLogComp/index'
import NewLogComp from '../NewLogComp/index'
import ActivityLogHeader from '../ActivityLogHeader/index'
import {TimeEntryStatus} from '../../../constants/Index'

class ActivityLogRow extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                {
                    this.props.timeLog.map((item, index) => {
                        return (
                            <div key={index} className = "activity-timelog">
                                <ActivityLogHeader logDate = {item._id}
                                                   activities = {item.activities}
                                                   onLogTimeClick = {() => this.props.logItem(item._id)}
                                                   onClearClick = {() => this.props.onClearClick(item._id)}/>
                                <Row className = "show-grid">
                                    {item.activities.map((activity, index) => {
                                        return ((activity.status == TimeEntryStatus.New) ? <NewLogComp logDate = {item._id}
                                                                                         newLogCreated = {(newLog) => this.props.newEntry(newLog, item._id)}
                                                                                         closedWithoutCreate = {() => {this.props.closedWithoutCreate(item._id)}} key={index}/> :
                                            <ActivityLogComp activity = {activity}
                                                             deleteEntry = {(deletedEntry) => this.props.deleteEntry(deletedEntry, item._id)}
                                                             edittedLog = {(editLog) => {this.props.edittedLog(editLog, item._id)}}
                                                             key = {index}
                                            />
                                        )
                                    })}

                                </Row>
                            </div>
                        )
                    })
                }



            </div>
        );
    }
}

export default ActivityLogRow;