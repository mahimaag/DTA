
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ActivityLogComp from '../ActivityLogComp/index'
import NewLogComp from '../NewLogComp/index'
import ActivityLogHeader from '../ActivityLogHeader/index'
import {TimeEntryStatus} from '../../../constants/Index'
import _ from 'lodash'

class ActivityLogRow extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                {
                    _.sortBy(this.props.timeLog,[function(o) { return o._id; }]).map((item, index) => {
                        return ((item.activities.length > 0 ?
                                    <div key={index} className = "col-md-12 activity-timelog">
                                        <ActivityLogHeader logDate = {item._id}
                                                           month = {this.props.month}
                                                           activities = {item.activities}
                                                           onLogTimeClick = {() => this.props.logItem(item._id)}/>
                                        <Row className = "show-grid">
                                            {item.activities.map((activity, index) => {
                                                return ((activity.status == TimeEntryStatus.New) ? <NewLogComp logDate = {item._id}
                                                                                                               newLogCreated = {(newLog) => this.props.newEntry(newLog, item._id)}
                                                                                                               closedWithoutCreate = {() => {this.props.closedWithoutCreate(item._id)}} key={index}/> :
                                                        <ActivityLogComp activity = {activity}
                                                                         date = {item._id}
                                                                         month = {this.props.month}
                                                                         timeLog = {this.props.timeLog}
                                                                         key = {index}
                                                        />
                                                )
                                            })}

                                        </Row>
                                    </div>:
                                    null

                            )

                        )
                    })
                }



            </div>
        );
    }
}

export default ActivityLogRow;