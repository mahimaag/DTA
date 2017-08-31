/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ActivityLogComp from '../ActivityLogComp/index'
import NewLogComp from '../NewLogComp/index'
import ActivityLogHeader from '../ActivityLogHeader/index'
import {TimeEntryStatus} from '../../../constants/Index'
import _ from 'lodash'
import {connect} from "react-redux"

class ActivityLogRow extends Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log("+++++++++++",this.props.searchedList,this.props.searchPermit,this.props.month)
        return(
            <div>
                {this.props.searchPermit ?
                    <div>
                        {_.sortBy(this.props.searchedList,[function (o){
                            return o.date;
                        }]).map((item,index) => {
                            console.log("each value is:",item)
                            return(
                                <div key={index} className="col-md-12 activity-timelog">
                                    <ActivityLogHeader logDate={item.date}
                                                       activities={this.props.searchedList}
                                                       onLogTimeClick={() => this.props.logItem(item.date)}/>
                                    <Row className="show-grid">
                                        <ActivityLogComp activity={item}
                                                         date={item.date}
                                                         month = {this.props.month}
                                                         edittedLog={(editLog) => {
                                                             this.props.edittedLog(editLog, item.date)
                                                         }}
                                                         key={index}
                                        />
                                    </Row>
                                </div>)
                        })}
                    </div>:
                    <div>
                        {
                            _.sortBy(this.props.timeLog, [function (o) {
                                return o._id;
                            }]).map((item, index) => {
                                return ((item.activities.length > 0 ?
                                            <div key={index} className="col-md-12 activity-timelog">
                                                <ActivityLogHeader logDate={item._id}
                                                                   month = {this.props.month}
                                                                   activities={item.activities}
                                                                   onLogTimeClick={() => this.props.logItem(item._id)}/>
                                                <Row className="show-grid">
                                                    {item.activities.map((activity, index) => {
                                                        return ((activity.status == TimeEntryStatus.New) ?
                                                                <NewLogComp logDate={item._id}
                                                                            newLogCreated={(newLog) => this.props.newEntry(newLog, item._id)}
                                                                            closedWithoutCreate={() => {
                                                                                this.props.closedWithoutCreate(item._id)
                                                                            }} key={index}/> :
                                                                <ActivityLogComp activity={activity}
                                                                                 date={item._id}
                                                                                 month = {this.props.month}
                                                                                 timeLog={this.props.timeLog}
                                                                                 edittedLog={(editLog) => {
                                                                                     this.props.edittedLog(editLog, item._id)
                                                                                 }}
                                                                                 key={index}
                                                                />
                                                        )
                                                    })}

                                                </Row>
                                            </div> :
                                            null

                                    )

                                )
                            })
                        }


                    </div>
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    searchedList: state.activity.searchedList,
    searchPermit: state.activity.searchPermit
});


export default connect(mapStateToProps)(ActivityLogRow);