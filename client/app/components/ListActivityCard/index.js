

import React, { Component } from 'react'
import ActivityLogRow from './../ActivityLogRow'
import { Grid, Row, Col } from 'react-bootstrap';
import { TimeEntryStatus, HeadingArray } from './../../../constants/Index'
import './style.css'
import ModalComp from '../../Core/ModalComp'
import { postActivities } from '../../actions/activity.actions'
import { connect } from 'react-redux';
import _ from 'lodash';

class ActivityLog extends Component{
    constructor(props){
        super(props);
        this.state = {
            timeEnteries: [],
        }
    }

    componentWillMount () {
        let timeLog = this.props.activityTimeLog.slice();
        this.setState({timeEnteries: timeLog})
    }



    componentWillReceiveProps(newProps) {
        console.log("cwrp in activity list")
        this.setState({
            timeEnteries: newProps.activityTimeLog.slice()
        },() => {console.log(`[cwrp]state in list card-----`,this.state.timeEnteries)})
    }

    newEntry = (newTimeLog, date) => {
        this.state.timeEnteries.map((item) => {
            if(item._id === date){
                item.activities.map((childItem) => childItem.status === TimeEntryStatus.New ? (Object.assign(childItem, newTimeLog)) : null);
            }
        });
        this.props.postActivities(newTimeLog);
    };

    addNewLog = (logDate) => {
        const _timeEntries = _.cloneDeep(this.state.timeEnteries);
        let target = _timeEntries.find((entry) => (entry._id == logDate) );
        target.activities.push({
                    "date": 0,
                    "activityType": "",
                    "hh": "",
                    "mm":"",
                    "description": "",
                    "status": TimeEntryStatus.New,
                    "collaborators": [],
                    "isProject":1
                }) ;
        this.setState({
            timeEnteries: _timeEntries
        });
    };

    closedWithoutCreate = (logDate) => {
        this.state.timeEnteries.map((entry) => entry._id === logDate ? (
            entry.activities.splice(entry.activities.findIndex((activity) => activity.status === TimeEntryStatus.New), 1)) : null);
        this.setState({
            timeEnteries:this.state.timeEnteries
        })
    };

    render(){
        return(
            <div className="col-md-12 activity-list-comp">
                <Row className="show-grid log-header">
                    {HeadingArray.map((item, index) =>{
                        return (
                            <Col md={item.md} lg={item.lg} className="log-col" key={index}>
                                <h5>{item.title}</h5>
                            </Col>
                        )})
                    }
                </Row>
                {(this.state.timeEnteries && this.state.timeEnteries.length > 0) ?
                    <ActivityLogRow timeLog={this.state.timeEnteries}
                                    month={this.props.month}
                                    logItem={(logDate) => this.addNewLog(logDate)}
                                    newEntry={(newTimeLog,date) => {this.newEntry(newTimeLog,date)}}
                                    closedWithoutCreate={(logDate) => {this.closedWithoutCreate(logDate)}}/>:
                    null
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    postActivities : (childItem) => {dispatch(postActivities(childItem))},

});

export default connect(null, mapDispatchToProps)(ActivityLog);


//Modal component ---------------------------
// Can also be used as below when we need to pass another component inside it's body..
/*
 <ModalComp modalShow={this.state.displayModal}
 modalHide = {() => {this.onCloseModalClick()}}
 modalHeaderMsg="Activity Deleted successfully"
 modalBody = {<ModalBodyComp/>} // or you can add text as body--------->>>modalBody = {'hello world'}
 modalFooterClose = {() => {this.onCloseModalClick()}}
 modalFooterText = 'Close'
 />*/



