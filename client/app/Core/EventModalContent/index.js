// Component having content to be shown on modal when any event is clicked

import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {connect} from 'react-redux'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import TtnButton from 'core/Button/btn';
import Dropdown from './../Dropdown'
import TsmsForm from './../Form';
import MultiSelectDropdown from './../MultiSelectDropDown'
import {deleteActivity, updateActivities} from './../../actions/activity.actions'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            duration: this.props.eventInfo.moreInfo.duration,
            activity: this.props.eventInfo.moreInfo.activity,
            activityType: this.props.eventInfo.moreInfo.activityType,
            description: this.props.eventInfo.moreInfo.description,
            collaborators: this.props.eventInfo.moreInfo.collaborators,
        }

    }

    onEdit = (event) => {
        event.preventDefault();
        this.setState({
            edit: true
        })
    };

    cancelEdit = (event) => {
        event.preventDefault();
        this.setState({
            edit: false
        })
    };

    onInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    updateEvent = (event) => {
        console.log('id----------------------:P--------',this.props.eventInfo.moreInfo._id);
        let updatedActivity = {
            _id: this.props.eventInfo.moreInfo._id,
            activity: this.state.activity,
            activityType: this.state.activityType,
            collaborators: this.state.collaborators,
            description: this.state.description,
            duration: this.state.duration,
            status: this.props.eventInfo.moreInfo.status
        }

        this.props.updateActivities(updatedActivity);
    }

    deleteEvent = (event) => {
        event.preventDefault();
        console.log("Delete :",this.props.eventInfo);
        this.props.deleteActivity(this.props.eventInfo.moreInfo._id)
    };

    setSelectedValue = (item, property) => {
        this.setState({
            [property]: item
        })
    };

    onSelectedVal = (newCollab) => {
        (this.state.collaborators.length && this.state.collaborators.indexOf(newCollab) > -1) ? null : this.state.collaborators.push(newCollab);
        this.setState({collaborators: this.state.collaborators});
    };

    onDeleteCollab = (deletedVal) => {
        this.state.collaborators.splice(this.state.collaborators.indexOf(deletedVal), 1);
        this.setState({
            collaborators: this.state.collaborators
        })
    }

    render() {
        console.log('this.props in modal for edit----------',this.props.eventInfo);
        let durationTime = ['30 mins','1 hr','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs'];
        let newCollabArray = [2590,2591,2592,2593];
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];
        let activityCategory = ['Project','Non-Project'];

        return (
            <div>{
                this.state.edit ?
                    <div>
                        <TsmsForm formClassName="add-activity">
                            <div>
                                <FormGroup controlId="projectCategory">
                                    <ControlLabel>Activity:</ControlLabel>
                                    <Dropdown data={activityCategory}
                                              title={this.state.activity || this.props.eventInfo.moreInfo.activity}
                                              onSelect={(item) => this.setSelectedValue(item,'activity')}
                                    />
                                </FormGroup>
                                <FormGroup controlId="projectName">
                                    <ControlLabel>Type:</ControlLabel>
                                    <Dropdown data={activityTitles}
                                              title={this.state.activityType || this.props.eventInfo.moreInfo.activityType}
                                              onSelect={(item) => this.setSelectedValue(item,'activityType')}/>
                                </FormGroup>
                                <FormGroup controlId="duration">
                                    <ControlLabel>Duration:</ControlLabel>
                                    <Dropdown data={durationTime}
                                              title={this.state.duration || this.props.eventInfo.moreInfo.duration}
                                              onSelect={(item) => this.setSelectedValue(item,'duration')}/>
                                </FormGroup>
                                <FormGroup controlId="description">
                                    <ControlLabel>Description:</ControlLabel>
                                    <FormControl type="text" label="Description" placeholder="Description" value={this.state.description || this.props.eventInfo.moreInfo.description} onChange={this.onInputChange} name="description"/>
                                </FormGroup>
                                <FormGroup controlId="collaborators">
                                    Collaborators: <MultiSelectDropdown collabArray = {newCollabArray}
                                                                        newCollab = {this.props.eventInfo.moreInfo.collaborators}
                                                                        title = {this.state.collaborators || this.props.eventInfo.moreInfo.collaborators}
                                                                        onSelectedVal = {(newCollab) => {this.onSelectedVal(newCollab)}}
                                                                        onDeleteCollab = {(deletedVal) => {this.onDeleteCollab(deletedVal)}}/>

                                </FormGroup>
                                <TtnButton iconButton
                                           level="secondary"
                                           rounded icon ="glyphicon glyphicon-ok"
                                           onClick = {this.updateEvent}
                                />
                                <TtnButton iconButton
                                           level="secondary"
                                           rounded icon ="glyphicon glyphicon-remove"
                                           onClick={this.cancelEdit}/>
                            </div>

                        </TsmsForm>
                    </div> :
                    <div>
                        <div>Activity : {this.props.eventInfo.moreInfo.activity}</div>
                        <div>Type : {this.props.eventInfo.moreInfo.activityType}</div>
                        <div>Duration : {this.props.eventInfo.moreInfo.duration}</div>
                        <div>Description : {this.props.eventInfo.moreInfo.description}</div>
                        <div>Collaborators : {this.props.eventInfo.moreInfo.collaborators}</div>
                        <TtnButton iconButton
                                   level="secondary"
                                   rounded icon ="glyphicon glyphicon-pencil"
                                   onClick={this.onEdit}/>
                        <TtnButton iconButton
                                   level="secondary"
                                   rounded icon ="glyphicon glyphicon-trash"
                                   onClick={this.deleteEvent}/>
                    </div>
            }
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    deleteActivity : (activityId) => {dispatch(deleteActivity(activityId))},
    updateActivities : (updatedActivity) => {dispatch(updateActivities(updatedActivity))}
});

export default connect(null,mapDispatchToProps)(ModalContent);



