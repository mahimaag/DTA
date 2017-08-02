/**
 * Created by saubhagya on 27/7/17.
 */
/**
 * Created by saubhagya on 20/7/17.
 */

import React, { Component } from 'react'
import ActivityLogRow from './../ActivityLogRow'
import { Grid, Row, Col } from 'react-bootstrap';
import SampleData from './../../../assests/SampleData'
import { TimeEntryStatus, HeadingArray } from './../../../constants/Index'
import './style.css'

class ActivityLog extends Component{
    constructor(props){
        super(props);
        this.state = {
            timeEnteries: SampleData,
        }
    }

    newEntry = (newTimeLog,date,newLogStatus) => {
        this.state.timeEnteries.map((item) => {
            if(item.date === date){
                item.status = newLogStatus;
                item.activities.map((childItem) => {
                    if(childItem.Status === TimeEntryStatus.New){
                        childItem.Id = newTimeLog.Id;
                        childItem.Activity = newTimeLog.Activity;
                        childItem.Type = newTimeLog.Type;
                        childItem.Duration = newTimeLog.Duration;
                        childItem.Description = newTimeLog.Description;
                        childItem.Status = newTimeLog.Status;
                    }
                })
            }
        })


        this.setState({
            timeEnteries: this.state.timeEnteries
        })
    }

    clearAllLogs = (allLogs,date) => {
        this.state.timeEnteries.map((entry) => {
            if(entry.date === date){
                entry.activities.splice(0,entry.activities.length);
            }
        })
        this.setState({
            timeEnteries:this.state.timeEnteries
        })

    };

    addNewLog = (item) => {
        this.state.timeEnteries.map((entry) => (entry.date == item.date && entry.status === TimeEntryStatus.Committed) ?
            (entry.status = TimeEntryStatus.Uncommitted,
                entry.activities.unshift({
                    "Id":"",
                    "Activity":"",
                    "Type": "",
                    "Duration": "",
                    "Description": "",
                    "Status": TimeEntryStatus.New
                }) ): null
        );
        this.setState({
            timeEnteries: this.state.timeEnteries
        });
    };

    edittedLog = (editItem,date) => {
        this.state.timeEnteries.map((entry) => {
            if(entry.date === date){
                entry.activities.map((childItem) => {
                    if(childItem.Id === editItem.Id){
                        childItem.Activity = editItem.Activity;
                        childItem.Type = editItem.Type;
                        childItem.Duration = editItem.Duration;
                        childItem.Description = editItem.Description;
                        childItem.Status = editItem.Status;
                    }
                })
            }
        })
        this.setState({
            timeEnteries: this.state.timeEnteries
        })
    }

    deleteEntry = (deletedEntry,logDate) => {
        this.state.timeEnteries.map((entry) => {
            if(entry.date === logDate){
                console.log('ids--------------',entry.activities.indexOf(deletedEntry))
                entry.activities.splice(entry.activities.indexOf(deletedEntry),1);

                /*entry.activities.map((childEntry) => {
                 if(childEntry.Id === deletedEntry.Id){
                 console.log('ids--------------',entry.activities.indexOf(childEntry));
                 entry.activities.splice(entry.activities.indexOf(childEntry),1);
                 }
                 })*/
            }
        })
        this.setState({
            timeEnteries:this.state.timeEnteries
        })
    }

    closedWithoutCreate = (newLogStatus,logDate) => {
        this.state.timeEnteries.map((entry) => {
            if(entry.date === logDate){
                entry.status = TimeEntryStatus.Committed;
                entry.activities.map((childEntry) => {
                    childEntry.Status === TimeEntryStatus.New ? entry.activities.splice(entry.activities.indexOf(childEntry),1):null
                })
            }
        })
        this.setState({
            timeEnteries:this.state.timeEnteries
        })
    }

    render(){
        return(
                <div className="col-md-12">
                    <Row className="show-grid">
                        {HeadingArray.map(item =>{
                            return (
                                <Col md={item.md} lg={item.lg} className="log-col">
                                    <h5>{item.title}</h5>
                                </Col>
                            )})
                        }
                    </Row>
                    <ActivityLogRow timeLog={this.state.timeEnteries}
                                    logItem={(item) => this.addNewLog(item)}
                                    newEntry={(newTimeLog,date,newLogStatus) => {this.newEntry(newTimeLog,date,newLogStatus)}}
                                    onClearClick={(allLogs,date) => {this.clearAllLogs(allLogs,date)}}
                                    edittedLog={(editItem,date) => {this.edittedLog(editItem,date)}}
                                    deleteEntry={(deletedEntry,logDate) => {this.deleteEntry(deletedEntry,logDate)}}
                                    closedWithoutCreate={(newLogStatus,logDate) => {this.closedWithoutCreate(newLogStatus,logDate)}}/>
                </div>
        );
    }
}

export default ActivityLog;