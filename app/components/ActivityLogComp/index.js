/**
 * Created by saubhagya on 20/7/17.
 */

import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import LogDropdown from './../../Core/Dropdown/LogDropdown'
import {TSMS_IconButton} from './../../Core/Button'

class ActivityLogComp extends Component{
    constructor(props){
        super(props);
        const activity = this.props.activity;
        this.state = {
            editBtn:'false',
            id: activity.Id,
            activity: activity.Activity,
            type:activity.Type,
            duration: activity.Duration,
            desc: activity.Description,
            status: activity.Status,
            projectName: activity.Type,
            projectCategory: activity.Activity,
            logDuration: activity.Duration
        }
    }

    onEditClick = () => {
        this.setState({
            editBtn:'true'
        })
    }

    onOkClick = () => {
        this.setState({
            editBtn:'false',
            activity: this.state.projectCategory,
            type: this.state.projectName,
            duration: this.state.logDuration,
        }, ()=> {
            let edittedLog = {
                Id: this.state.id,
                Activity: this.state.activity,
                Type: this.state.type,
                Duration: this.state.duration,
                Description: this.state.desc,
                Status: this.state.status
            }
            this.props.edittedLog(edittedLog);

        })

    }

    onEditDeleteClick = () => {
        this.setState({
            editBtn:'false'
        })
    }

    onDeleteClick = (activity) => {
        console.log('data to be deleted----------->>>',activity);

        this.props.deleteEntry(activity);
    }


    setSelectedValue = (item, property) => {
        this.setState({
            [property]: item
        })
    }

    onDescChange = (event) => {
        this.setState({
            desc: event.target.value
        })

    }

    render(){
        const activity = this.props.activity;
        let sampleData = this.props.sampleData;
        let activityArray = [], typeArray = [], durationArray = [];
        sampleData.forEach(function(item){
            activityArray.push(item.Activity);
            typeArray.push(item.Type);
            durationArray.push(item.Duration);
        })
        let activityCategory = ['Project','Non-Project'];
        let durationTime = ['30 mins','1 hr','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs'];

        return(
            <div>
                {this.state.editBtn === 'true'?
                    <div className="data-div">
                        <Col md={1} lg={1} className="log-col">
                            <LogDropdown className='activity'
                                         title={this.state.projectCategory}
                                         data={activityCategory}
                                         onSelect={(item) => {this.setSelectedValue(item, 'projectCategory')}}/>
                        </Col>
                        <Col md={2} lg={2} className="log-col">
                            <LogDropdown className='type'
                                         data={typeArray}
                                         title={this.state.projectName}
                                         onSelect={(item) => this.setSelectedValue(item, 'projectName')}/>
                        </Col>
                        <Col md={1} lg={1} className="log-col">
                           <LogDropdown className="duration"
                                        title={this.state.logDuration}
                                        data={durationTime} onSelect={(item) => {this.setSelectedValue(item, 'logDuration')}}/>
                        </Col>
                        <Col md={3} lg={4} className="log-col">
                            <input type="text" value={this.state.desc} onChange={this.onDescChange.bind(this)}/>
                        </Col>
                        <Col md={1} lg={1} className="log-col">
                            <span>{this.state.status}</span>
                        </Col>
                        <Col md={2} lg={2} lgOffset={1} className="log-col">
                            <TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                                             onClickFunc={() => this.onOkClick()}
                                             spanClass="glyphicon glyphicon-ok"/>

                            <TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                                             onClickFunc={() => this.onEditDeleteClick()}
                                             spanClass="glyphicon glyphicon-remove"/>



                        </Col>
                    </div>:
                    <div>
                    {/*{this.state.deleteBtn === 'false'?*/}
                        <div className="data-div">
                            <Col md={1} lg={1} className="log-col">
                                <span>{activity.Activity}</span>
                            </Col>
                            <Col md={2} lg={2} className="log-col">
                                <span>{activity.Type}</span>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <span>{activity.Duration}</span>
                            </Col>
                            <Col md={3} lg={4} className="log-col">
                                <span>{activity.Description}</span>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <span>{activity.Status}</span>
                            </Col>
                            <Col md={2} lg={2} lgOffset={1} className="log-col">
                                {/* <button className="edit-clear-button"><img src={editIcon}/></button>
                                 <button className="edit-clear-button"><img src={deleteIcon}/></button>*/}

                                <TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                                                 onClickFunc={() => this.onEditClick()}
                                                 spanClass="glyphicon glyphicon-pencil"/>

                                <TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                                                 onClickFunc={() => this.onDeleteClick(activity)}
                                                 spanClass="glyphicon glyphicon-remove"/>


                            </Col>
                        </div>{/*:''
                    }*/}
                    </div>
                }
            </div>
        )
    }
}

export default ActivityLogComp;