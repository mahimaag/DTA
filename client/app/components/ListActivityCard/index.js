/**
 * Created by saubhagya on 27/7/17.
 */

import React, { Component } from 'react'
import ActivityLogRow from './../ActivityLogRow'
import { Grid, Row, Col } from 'react-bootstrap';
import SampleData from './../../../assests/SampleData'
import { TimeEntryStatus, HeadingArray } from './../../../constants/Index'
import './style.css'
import ModalComp from '../../Core/ModalComp'
import ModalBodyComp from '../../Core/ModalBodyComp'
import {postActivities, updateActivities, deleteActivity} from '../../actions/activity.actions'
import { connect } from 'react-redux';

class ActivityLog extends Component{
    constructor(props){
        super(props);
        this.state = {
            timeEnteries: [],
            displayModal: false
        }
    }

    componentWillMount () {
       this.setState({timeEnteries: this.props.activityTimeLog})
    }

    componentWillReceiveProps(){
        console.log('CWRP called----',this.props.activityTimeLog);
        this.setState({timeEnteries: this.props.activityTimeLog},() => {console.log('state in list card-----',this.state.timeEnteries)})
    }

    newEntry = (newTimeLog, date) => {
        this.state.timeEnteries.map((item) => {
            if(item._id === date){
                item.activities.map((childItem) => childItem.status === TimeEntryStatus.New ? (Object.assign(childItem, newTimeLog), this.props.postActivities(childItem)) : null);
            }
        });

        this.setState({
            timeEnteries: this.state.timeEnteries
        })
    };

    clearAllLogs = (date) => {
        this.state.timeEnteries.map((entry) => entry.date === date ? entry.activities = [] : null);
        this.setState({
            timeEnteries:this.state.timeEnteries
        })

    };

    addNewLog = (logDate) => {
        this.state.timeEnteries.map((entry) => (entry._id == logDate) ?
            (entry.activities.unshift({
                    "date":"",
                    "activity":"",
                    "activityType": "",
                    "duration": "",
                    "description": "",
                    "status": TimeEntryStatus.New,
                    "collaborators": []
                }) ): null
        );
        this.setState({
            timeEnteries: this.state.timeEnteries
        });
    };

    edittedLog = (editItem,date) => {
        this.state.timeEnteries.map((entry) => {
            if (entry._id === date) {
                entry.activities.map((childItem) => childItem.activityId === editItem.activityId ? (Object.assign(childItem, editItem), this.props.updateActivities(childItem)) : null);
            }
        })
        this.setState({
            timeEnteries: this.state.timeEnteries
        })
    }

    deleteEntry = (deletedEntry,logDate) => {
        console.log('activity to be deleted----',deletedEntry);
        this.state.timeEnteries.map((entry) => entry._id === logDate ? this.props.deleteActivity(deletedEntry.activityId) : null);
        this.setState({
            timeEnteries:this.state.timeEnteries,
            displayModal: true
        })
    };

    closedWithoutCreate = (logDate) => {
        this.state.timeEnteries.map((entry) => entry._id === logDate ? (
            entry.activities.splice(entry.activities.findIndex((activity) => activity.status === TimeEntryStatus.New), 1)) : null);
        this.setState({
            timeEnteries:this.state.timeEnteries
        })
    };

    onCloseModalClick = () => {
        this.setState({
            displayModal: false
        })

    }

    render(){
        console.log('222222222222', this.props.activityTimeLog);
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
                    <ActivityLogRow timeLog={this.state.timeEnteries}
                                    logItem={(logDate) => this.addNewLog(logDate)}
                                    newEntry={(newTimeLog,date) => {this.newEntry(newTimeLog,date)}}
                                    onClearClick={(date) => {this.clearAllLogs(date)}}
                                    edittedLog={(editItem,date) => {this.edittedLog(editItem,date)}}
                                    deleteEntry={(deletedEntry,logDate) => {this.deleteEntry(deletedEntry,logDate)}}
                                    closedWithoutCreate={(logDate) => {this.closedWithoutCreate(logDate)}}/>

                    <ModalComp modalClassName = 'inmodal'
                               modalShow = {this.state.displayModal}
                               modalHide = {() => {this.onCloseModalClick()}}
                               modalHeaderMsg = "Activity Deleted successfully"
                               modalBody = {'deletion completed!!!'}
                               modalFooterClose = {() => {this.onCloseModalClick()}}
                               modalFooterText = 'Close'
                    />
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getActivities : () => {dispatch(getActivities())},
    postActivities : (childItem) => {dispatch(postActivities(childItem))},
    updateActivities : (childItem) => {dispatch(updateActivities(childItem))},
    deleteActivity : (activityId) => {dispatch(deleteActivity(activityId))}

});

export default connect(mapDispatchToProps)(ActivityLog);


//Modal component ---------------------------
// Can also be used as below when we need to pass another component inside it's body..
/*
 <ModalComp modalShow={this.state.displayModal}
 modalHide = {() => {this.onCloseModalClick()}}
 modalHeaderMsg="Activity Deleted successfully"
 modalBody = {<ModalBodyComp/>}
 modalFooterClose = {() => {this.onCloseModalClick()}}
 modalFooterText = 'Close'
 />*/

//entry.activities.splice(entry.activities.indexOf(deletedEntry),1)