import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {connect} from 'react-redux'
import Dropdown from './../Dropdown'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import events from '../../config/events'
import TtnButton from './../Button/btn';
import TsmsForm from './../Form';
import {TimeEntryStatus} from './../../../constants/Index'
import {postActivities} from './../../actions/activity.actions'
import MultiSelectDropdown from '../../Core/MultiSelectDropDown'
import {getDate} from './../../../utils/common'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

let newEvents = [{
    title:'',
    start:new Date(),
    end:new Date()
}];

class ModalContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCalendar:false,
            // projectCategory:'Select',
            activityType:'Select',
            hh:'Select',
            mm:'Select',
            collaborators:[],
            description:'',
            repeatActivity : [],
            savedEvent:false,


        }
    }

    selectSlot(slot) {
        let newRepeatedDates = this.state.repeatedDates;
        if(newRepeatedDates.indexOf(getDate(slot.start))>=0){
            newRepeatedDates.splice((newRepeatedDates.indexOf(getDate(slot.start))),1)
        }else{
            newRepeatedDates.push(getDate(slot.start));
        }

        this.setState({
            repeatActivity:newRepeatedDates
        });

    } // todo : change color of selected slot

    setSelectedValue = (item, property) => {
        this.setState({
            [property]: item
        })
    };

    repeatEvent = () => {
        this.setState({
            showCalendar:true,

        })
    };

    saveEvent = (event) => {
        event.preventDefault();
        console.log("type is ",typeof (this.state.hh),typeof (this.state.mm))
        if(this.state.hh === 'Select' || this.state.mm === 'Select' || this.state.activityType === 'Select'){
            alert("Fields cannot be empty")
        }else{
            let dated = getDate(this.props.message);
            let activityLog = {
                "employeeId":2590,
                "activityType":this.state.activityType,
                "status":TimeEntryStatus.Pending,
                "hh":this.state.hh,
                "mm":this.state.mm,
                "collaborators":this.state.collaborators,
                "description":this.state.description,
                "date":+ new Date(dated),
                "repeatActivity":this.state.repeatActivity
            };

            this.props.postActivities(activityLog);

            this.setState({
                savedEvent:true,

            })
        }
    };

    saveRepeat = (event) => {
        this.state.repeatedDates.map((item) => {
            events.push({
                'title': this.state.hh+" " +this.state.activityType,
                'start': item,
                'end': item,
            })
        })
    };

    onInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
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

    render(){
        let newCollabArray = [2590,2591,2592,2593];
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];
        let hour = [1,2,3,4,5,6,7,8];
        let minutes = [10,20,30,40,50];
        return(
            <div>{
                this.state.showCalendar ?
                    <div className="wrapper-calendar">
                        <BigCalendar
                            selectable
                            events={newEvents}
                            views={['month']}
                            toolbar={false}
                            onSelectSlot = { (slot) => this.selectSlot(slot)}
                        />
                        <button onClick={(e) => this.saveRepeat(e)}>Save </button>
                    </div>:
                    <TsmsForm formClassName="add-activity">
                        <div>
                            <FormGroup controlId="activityType">
                                <ControlLabel>Activity:</ControlLabel>
                                <Dropdown data={activityTitles}
                                                 title={this.state.activityType}
                                                 onSelect={(item) => this.setSelectedValue(item,'activityType')}
                                />
                            </FormGroup>
                            <FormGroup controlId="hh">
                                <ControlLabel>hh:</ControlLabel>
                                <Dropdown data={hour}
                                                 title={this.state.hh}
                                                 onSelect={(item) => this.setSelectedValue(item,'hh')}/>
                            </FormGroup>
                            <FormGroup controlId="mm">
                                <ControlLabel>mm:</ControlLabel>
                                <Dropdown data={minutes}
                                          title={this.state.mm}
                                          onSelect={(item) => this.setSelectedValue(item,'mm')}/>
                            </FormGroup>
                            <FormGroup controlId="description">
                                <ControlLabel>Description:</ControlLabel>
                                <FormControl type="text" label="Description" placeholder="Description" value={this.state.description} onChange={this.onInputChange} name="description"/>
                            </FormGroup>
                            <FormGroup controlId="collaborators">
                                Collaborators: <MultiSelectDropdown collabArray = {newCollabArray}
                                                                    newCollab = {this.state.collaborators}
                                                                    title = 'Select'
                                                                    onSelectedVal = {(newCollab) => {this.onSelectedVal(newCollab)}}
                                                                    onDeleteCollab = {(deletedVal) => {this.onDeleteCollab(deletedVal)}}/>

                            </FormGroup>
                            {
                                this.state.savedEvent ?
                                    <TtnButton level = "primary"
                                               title = "Repeat"
                                               onClick={(e) => this.repeatEvent(e)}/>
                                    :
                                    <TtnButton level = "primary"
                                               title = "Save"
                                               onClick={(e) => this.saveEvent(e)}/>
                            }
                        </div>

                    </TsmsForm>
                 }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    postActivities : (activityLog) => {dispatch(postActivities(activityLog))}
});

export default connect(null,mapDispatchToProps)(ModalContent);
