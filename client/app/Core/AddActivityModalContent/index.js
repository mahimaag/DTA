import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {connect} from 'react-redux'

import events from '../../config/events'
import {TimeEntryStatus} from './../../../constants/Index'
import Dropdown from './../Dropdown'
import TtnButton from 'core/Button/btn';
import {postActivities} from './../../actions/activity.actions'

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
            projectCategory:'Select',
            projectName:'Select',
            duration:'Select',
            repeatedDates : [],
            savedEvent:false,
            description:'',
            collaborators:[]
        }
    }

    selectSlot(slot) {
        let newRepeatedDates = this.state.repeatedDates;
        if(newRepeatedDates.indexOf(`${slot.start.getMonth()+1}/${slot.start.getDate()}/${slot.start.getFullYear()}`)>=0){
            newRepeatedDates.splice((newRepeatedDates.indexOf(`${slot.start.getMonth()+1}/${slot.start.getDate()}/${slot.start.getFullYear()}`)),1)
        }else{
            newRepeatedDates.push(`${slot.start.getMonth()+1}/${slot.start.getDate()}/${slot.start.getFullYear()}`);
        }

        this.setState({
            repeatedDates:newRepeatedDates
        },() => {
            console.log("Event repeats on",this.state.repeatedDates)
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
        if(this.state.duration === 'Select' || this.state.projectCategory === 'Select' || this.state.projectName==='Select'){
            alert("Fields cannot be empty")
        }else{
            console.log(this.props.message,typeof (this.props.message));
            let dated = `${this.props.message.getMonth() + 1 }/${this.props.message.getDate()}/${this.props.message.getFullYear()}`;
            events.push({
                'title': this.state.duration +" " +this.state.projectName,
                'start': new Date(dated),
                'end': new Date(dated),
            });

            let activityLog = {
                "employeeId":"2590",
                "date":Date.now(),
                "activity":this.state.projectCategory,
                "activityType":this.state.projectName,
                "description":this.state.description,
                "status":TimeEntryStatus.Pending,
                "duration":this.state.duration,
                "collaborators":this.state.collaborators
            };

            this.props.postActivities(activityLog); // todo : dispatch(asyncAction(activityLog))
            console.log("saved event is ",this.state);
            console.log("date clicked is -----------", dated);

            this.setState({
                savedEvent:true,

            })
        }
    }; // todo: save this new event in mongodb

    saveRepeat = (event) => {
        this.state.repeatedDates.map((item) => {
            events.push({
                'title': this.state.duration +" " +this.state.projectName,
                'start': item,
                'end': item,
            })
        })
    }; // todo : save the repeated event in mongodb

    onInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    render(){
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];
        let activityCategory = ['Project','Non-Project'];
        let durationTime = ['30 mins','1 hr','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs'];
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
                        <TtnButton title="Save" level="primary" onClick = {this.saveRepeat}/>
                    </div>:
                    <div>
                        Activity : <Dropdown data={activityCategory}
                                             title={this.state.projectCategory}
                                             onSelect={(item) => this.setSelectedValue(item,'projectCategory')}
                    />
                        Type : <Dropdown data={activityTitles}
                                         title={this.state.projectName}
                                         onSelect={(item) => this.setSelectedValue(item,'projectName')}/>
                        Duration : <Dropdown data={durationTime}
                                             title={this.state.duration}
                                             onSelect={(item) => this.setSelectedValue(item,'duration')}/>
                        Description:<input type="text"
                                           onChange={(e)=> this.onInputChange(e)}
                                           name = "description"
                                           value={this.state.description}
                    />
                        Collaborators : <input type="text"
                                               onChange={(e)=> this.onInputChange(e)}
                                               name = "collaborators"
                                               value={this.state.collaborators}
                    />
                        {
                            this.state.savedEvent ?
                                <TtnButton title="Repeat" level="primary" onClick = {this.repeatEvent}/>
                                :
                                <TtnButton title="Save" level="primary" onClick = {this.saveEvent}/>

                        }
                    </div>
            }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    postActivities : (activityLog) => {dispatch(postActivities(activityLog))}
});

export default connect(null,mapDispatchToProps)(ModalContent);
