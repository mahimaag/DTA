/**
 * Created by saubhagya on 20/7/17.
 */

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import LogDropdown from '../../Core/Dropdown/index'
import {TSMS_IconButton} from './../../Core/Button'
import ActivityLogCollaborator from '../ActivityLogCollaborator'


class ActivityLogComp extends Component{
    constructor(props){
        super(props);
        const activity = this.props.activity;
        this.state = {
            editBtn:'false',
            activity:{
                Id: activity.Id,
                Activity: activity.Activity,
                Type:activity.Type,
                Duration: activity.Duration,
                Description: activity.Description,
                Status: activity.Status,
                Collaborators: activity.Collaborators
            },
            projectName: activity.Type,
            projectCategory: activity.Activity,
            logDuration: activity.Duration,
            newDesc: activity.Description
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
            activity: {
                Id: this.props.activity.Id,
                Activity: this.state.projectCategory,
                Type:this.state.projectName,
                Duration: this.state.logDuration,
                Description: this.state.newDesc,
                Status: this.props.activity.Status,
                Collaborators: this.state.activity.Collaborators
            },
        }, ()=> {
            this.props.edittedLog(this.state.activity);

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
            activity: {
                Description: event.target.value
            }
        },()=>{
            console.log('desc', this.state.activity.Description);
            this.setState({
                newDesc: this.state.activity.Description
            })
        })

    }

    onCollabChange = (collaborators) => {
        this.setState({
            activity: {
                Collaborators: collaborators
            }
        })
    }

    render(){
        console.log('collaborators in actovity log----',this.props);
        const activity = this.props.activity;
        let sampleData = this.props.sampleData;
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];
        let activityCategory = ['Project','Non-Project'];
        let durationTime = ['30 mins','1 hr','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs'];

        return(
            <div>
                {this.state.editBtn === 'true'?
                    <div className="data-div">
                        <Row>
                            <Col md={1} lg={1} className="log-col">
                                <LogDropdown className='activity'
                                             title={this.state.projectCategory}
                                             data={activityCategory}
                                             onSelect={(item) => {this.setSelectedValue(item, 'projectCategory')}}/>
                            </Col>
                            <Col md={2} lg={2} className="log-col">
                                <LogDropdown className='type'
                                             data={activityTitles}
                                             title={this.state.projectName}
                                             onSelect={(item) => this.setSelectedValue(item, 'projectName')}/>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <LogDropdown className="duration"
                                             title={this.state.logDuration}
                                             data={durationTime}
                                             onSelect={(item) => {this.setSelectedValue(item, 'logDuration')}}/>
                            </Col>
                            <Col md={4} lg={4} className="log-col">
                                <input type="text"
                                       value={this.state.activity.Description}
                                       onChange={(value) => {this.onDescChange(value)}}/>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <span>{this.state.activity.Status}</span>
                            </Col>
                            <Col md={2} lg={2} lgOffset={1} className="log-col">
                                <TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                                                 onClickFunc={() => this.onOkClick()}
                                                 spanClass="glyphicon glyphicon-ok"/>

                                <TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                                                 onClickFunc={() => this.onEditDeleteClick()}
                                                 spanClass="glyphicon glyphicon-remove"/>


                            </Col>
                            <Col md={12} lg={12} className="log-col">
                                <ActivityLogCollaborator collaborators={this.props.collaborators}
                                                         onCollabChange={(collaborators) => {this.onCollabChange(collaborators)}}
                                                         editable='true'/>
                            </Col>
                        </Row>

                    </div>:
                    <div className="data-div">
                        <Row>
                            <Col md={1} lg={1} className="log-col">
                                <span>{activity.Activity}</span>
                            </Col>
                            <Col md={2} lg={2} className="log-col">
                                <span>{activity.Type}</span>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <span>{activity.Duration}</span>
                            </Col>
                            <Col md={4} lg={4} className="log-col">
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
                                                 spanClass="glyphicon glyphicon-trash"/>


                            </Col>
                            <Col md={12} lg={12} className="log-col">
                                <ActivityLogCollaborator collaborators={this.props.collaborators}/>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

export default ActivityLogComp;