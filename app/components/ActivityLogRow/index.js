/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import ActivityLogComp from '../ActivityLogComp/index'
import NewLogComp from '../NewLogComp/index'
import ActivityLogHeader from '../ActivityLogHeader/index'
import {TimeEntryStatus} from '../../../constants/Index'

/*import TSMS_TextButton from './TSMS_TextButton'
import editIcon from '../assets/images/editIcon.png'
import deleteIcon from '../assets/images/deleteIcon.jpg'*/

class ActivityLogRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            activity:'',
            type:'',
            duration:'',
            description:'',
            status: TimeEntryStatus.Pending,
            collaborators: []
        }
    }

    newLogData = (newObj, date, newLogStatus) => {
        console.log('test for new logged entry', newObj)
        this.props.newEntry(newObj,date, newLogStatus);
    };

    /*onClearClick = () => {
        console.log('clear all data------------------->>>>');
        //sampleData.splice(0,sampleData.length);
        //console.log('------------------',sampleData);
    }*/



    deleteEntry = (deletedEntry,logDate) => {
        this.props.deleteEntry(deletedEntry,logDate);
    }

    render(){
        console.log('props in row component--------',this.props);
        return(
            <div>
                {
                    this.props.timeLog.map((item, index) => {
                        return (
                            <div key={index}>
                                <ActivityLogHeader logDate={item.date}
                                                   activities = {item.activities}
                                                   onLogTimeClick={() => this.props.logItem(item)}
                                                   onClearClick={() => this.props.onClearClick(item,item.date)}/>
                                <Row className="show-grid">
                                    {/*{(this.state.newEntry === true)?
                                        <NewLogComp sampleData={item.activities} newLogCreated={(newLog) => this.newLogData(newLog,item.date)}/>:null
                                    }*/}
                                    {item.activities.map((activity, index) => {
                                        return ((activity.Status == TimeEntryStatus.New) ? <NewLogComp sampleData={item.activities}
                                                                                         sampleDataStatus={item.status}
                                                                                         newLogCreated={(newLog,newLogStatus) => this.newLogData(newLog,item.date,newLogStatus)}
                                                                                         closedWithoutCreate={(newLogStatus) => {this.props.closedWithoutCreate(newLogStatus,item.date)}} key={index}/> :
                                            <ActivityLogComp activity={activity}
                                                             sampleData={item.activities}
                                                             deleteEntry={(deletedEntry) => {this.deleteEntry(deletedEntry,item.date)}}
                                                             edittedLog={(editLog) => {this.props.edittedLog(editLog, item.date)}}
                                                             collaborators={activity.Collaborators}
                                                             key={index}
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