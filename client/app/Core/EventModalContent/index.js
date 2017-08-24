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
import {deleteActivity,updateActivities} from './../../actions/activity.actions'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            hh:'',
            mm:'',
            activityType:'',
            description:'',
            collaborators:[]
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

    saveEditedEvent = (event) => {
        event.preventDefault();
        let updatedEvent = this.props.eventInfo.moreInfo;
        updatedEvent.activityType = this.state.activityType || updatedEvent.activityType;
        updatedEvent.hh = this.state.hh || updatedEvent.hh;
        updatedEvent.mm = this.state.mm || updatedEvent.mm;
        updatedEvent.description = this.state.description || updatedEvent.description;

        console.log(updatedEvent);
        this.props.updateActivities(updatedEvent);
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

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
        let hour = [1,2 ,3,4,5,6,7 ,8 ];
        let minutes = [10,20,30,40,50];
        let newCollabArray = [2590,2591,2592,2593];
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];

        return (
            <div>{
                this.state.edit ?
                    <div>
                        <TsmsForm formClassName="add-activity">
                            <div>
                                <FormGroup controlId="projectCategory">
                                    <ControlLabel>Activity:</ControlLabel>
                                    <Dropdown data={activityTitles}
                                              title={this.state.activityType || this.props.eventInfo.moreInfo.activityType}
                                              onSelect={(item) => this.setSelectedValue(item,'activityType')}
                                    />
                                </FormGroup>
                                <FormGroup controlId="hh">
                                    <ControlLabel>hh:</ControlLabel>
                                    <Dropdown data={hour}
                                              title={this.state.hh || this.props.eventInfo.moreInfo.hh}
                                              onSelect={(item) => this.setSelectedValue(item,'hh')}/>
                                </FormGroup>
                                <FormGroup controlId="mm">
                                    <ControlLabel>mm:</ControlLabel>
                                    <Dropdown data={minutes}
                                              title={this.state.mm || this.props.eventInfo.moreInfo.mm}
                                              onSelect={(item) => this.setSelectedValue(item,'mm')}/>
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
                                           onClick={this.saveEditedEvent}/>
                                <TtnButton iconButton
                                           level="secondary"
                                           rounded icon ="glyphicon glyphicon-remove"
                                           onClick={this.cancelEdit}/>
                            </div>

                        </TsmsForm>
                    </div> :
                    <div>
                        <div>Activity : {this.props.eventInfo.moreInfo.activityType}</div>
                        <div>hh : {this.props.eventInfo.moreInfo.hh}</div>
                        <div>mm : {this.props.eventInfo.moreInfo.mm}</div>
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
    updateActivities : (activityLog) => {dispatch(updateActivities(activityLog))}
});

export default connect(null,mapDispatchToProps)(ModalContent);



