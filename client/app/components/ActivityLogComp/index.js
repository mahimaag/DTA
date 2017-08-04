/**
 * Created by saubhagya on 20/7/17.
 */

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import LogDropdown from '../../Core/Dropdown/index'
import {TSMS_IconButton} from './../../Core/Button'
import ActivityLogCollaborator from '../ActivityLogCollaborator'
import MultiSelectDropdown from '../../Core/MultiSelectDropDown'



class ActivityLogComp extends Component{
    constructor(props){
        super(props);
        const logActivity = Object.assign({}, this.props.activity);
        this.state = {
            editBtn:'false',
            activity: logActivity
        }
    }

    onEditClick = () => {
        this.setState({
            editBtn:'true'
        })
    }

    onOkClick = () => {
        this.setState({
            editBtn: 'false'
        });
        this.props.edittedLog(this.state.activity);

    };

    onEditDeleteClick = () => {
        const activity = Object.assign({}, this.props.activity);
        this.setState({
            editBtn:'false',
            activity: activity
        });
    }

    onDeleteClick = (activity) => {
        this.props.deleteEntry(activity);
    }


    setSelectedValue = (item, property) => {
        this.state.activity[property] = item;
        this.setState({
            activity: this.state.activity
        })
    }

    onDescChange = (event) => {
        this.setState({
            newDesc: event.target.value
        });
    }

    onCollabChange = (collaborators) => {
        this.setState({
            activity: {
                Collaborators: collaborators
            }
        })
    }

    onSelectedVal = (newCollab) => {
        (this.state.activity.Collaborators.length && this.state.activity.Collaborators.indexOf(newCollab) > -1) ? null : this.state.activity.Collaborators.push(newCollab);
        this.setState({activity: this.state.activity});
    };

    onDeleteCollab = (deletedVal) => {
        this.state.activity.Collaborators.splice(this.state.activity.Collaborators.indexOf(deletedVal), 1);
        this.setState({
            activity: this.state.activity
        })
    };

    render(){
        const activity = this.props.activity;
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];
        let activityCategory = ['Project','Non-Project'];
        let durationTime = ['30 mins','1 hr','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs'];
        let newCollabArray = ['Gaurav','Rubi','Mahima','Nitin'];
        return(
            <div>
                {this.state.editBtn === 'true'?
                    <div className="data-div">
                        <Row>
                            <Col md={1} lg={1} className="log-col">
                                <LogDropdown className='activity'
                                             title={this.state.activity.Activity}
                                             data={activityCategory}
                                             onSelect={(item) => {this.setSelectedValue(item, 'Activity')}}/>
                            </Col>
                            <Col md={2} lg={2} className="log-col">
                                <LogDropdown className='type'
                                             data={activityTitles}
                                             title={this.state.activity.Type}
                                             onSelect={(item) => this.setSelectedValue(item, 'Type')}/>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <LogDropdown className="duration"
                                             title={this.state.activity.Duration}
                                             data={durationTime}
                                             onSelect={(item) => {this.setSelectedValue(item, 'Duration')}}/>
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
                                <MultiSelectDropdown collabArray={newCollabArray}
                                                     newCollab={this.state.activity.Collaborators}
                                                     title='Select'
                                                     onSelectedVal = {(newCollab) => {this.onSelectedVal(newCollab)}}
                                                     onDeleteCollab={(deletedVal) => {this.onDeleteCollab(deletedVal)}}/>
                                {/*<ActivityLogCollaborator collaborators={activity.Collaborators}
                                                         onCollabChange={(collaborators) => {this.onCollabChange(collaborators)}}
                                                         editable='true'/>*/}
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
                                <ActivityLogCollaborator collaborators={activity.Collaborators}/>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

export default ActivityLogComp;