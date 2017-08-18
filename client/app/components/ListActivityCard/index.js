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
import { connect } from 'react-redux';

class ActivityLog extends Component{
    constructor(props){
        super(props);
        this.state = {
            timeEnteries: SampleData,
            displayModal: false
        }
    }

    newEntry = (newTimeLog, date) => {
        this.state.timeEnteries.map((item) => {
            if(item.date === date){
                item.status = TimeEntryStatus.Committed;
                item.activities.map((childItem) => childItem.Status === TimeEntryStatus.New ? Object.assign(childItem, newTimeLog) : null);
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
        this.state.timeEnteries.map((entry) => (entry.date == logDate && entry.status === TimeEntryStatus.Committed) ?
            (entry.status = TimeEntryStatus.Uncommitted,
                entry.activities.unshift({
                    "Id":"",
                    "Activity":"",
                    "Type": "",
                    "Duration": "",
                    "Description": "",
                    "Status": TimeEntryStatus.New,
                    "Collaborators": []
                }) ): null
        );
        this.setState({
            timeEnteries: this.state.timeEnteries
        });
    };

    edittedLog = (editItem,date) => {
        this.state.timeEnteries.map((entry) => {
            if(entry.date === date){
                entry.activities.map((childItem) => childItem.Id === editItem.Id ? Object.assign(childItem, editItem) : null);
            }
        });
        this.setState({
            timeEnteries: this.state.timeEnteries
        })
    }

    deleteEntry = (deletedEntry,logDate) => {
        this.state.timeEnteries.map((entry) => entry.date === logDate ? entry.activities.splice(entry.activities.indexOf(deletedEntry),1) : null);
        this.setState({
            timeEnteries:this.state.timeEnteries,
            displayModal: true
        })
    };

    closedWithoutCreate = (logDate) => {
        this.state.timeEnteries.map((entry) => entry.date === logDate ? (entry.status = TimeEntryStatus.Committed,
            entry.activities.splice(entry.activities.findIndex((activity) => activity.Status === TimeEntryStatus.New), 1)) : null);
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
        console.log('222222222222', this.props);
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

const mapStateToProps = (state) => {
    return {
        activity: state.activity
    }
};

export default connect(mapStateToProps)(ActivityLog);

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