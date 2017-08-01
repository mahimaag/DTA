import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Dropdown from './../Dropdown'

import events from '../../config/events'
import ModalComponent from './../CustomModal'

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
            savedEvent:false
        }
    }

    setSelectedValue = (item, property) => {
        this.setState({
            [property]: item
        })
    };

    repeatEvent = () => {
        this.setState({
            showCalendar:true
        })
    };

    selectSlot(slot) {
        let newRepeatedDates = this.state.repeatedDates;
        if(newRepeatedDates.indexOf(slot.start.getMonth()+1+'/'+slot.start.getDate()+'/'+slot.start.getFullYear())>=0){
            newRepeatedDates.splice((newRepeatedDates.indexOf(slot.start.getMonth()+1+'/'+slot.start.getDate()+'/'+slot.start.getFullYear())),1)
        }else{
            newRepeatedDates.push(slot.start.getMonth()+1+'/'+slot.start.getDate()+'/'+slot.start.getFullYear());
        }

        this.setState({
            repeatedDates:newRepeatedDates
        },() => {
            console.log("Event repeats on",this.state.repeatedDates)
        });
    }

    saveEvent = (event) => {
        event.preventDefault();
        if(this.state.duration === 'Select' || this.state.projectCategory === 'Select' || this.state.projectName==='Select'){
            alert("Fields cannot be empty")
        }else{
            console.log(this.props.message,typeof (this.props.message));
            let dated = this.props.message.getMonth() + 1 + '/' + this.props.message.getDate() + '/' + this.props.message.getFullYear();
            events.push({
                'title': this.state.duration +" " +this.state.projectName,
                'start': new Date(dated),
                'end': new Date(dated),
            });

            console.log("saved event is ",this.state);
            console.log("date clicked is ---------", dated);

            this.setState({
                savedEvent:true
            })
        }
    };

    saveRepeat = (event) => {
        event.preventDefault();
        this.state.repeatedDates.map((item) => {
            events.push({
                'title': this.state.duration +" " +this.state.projectName,
                'start': item,
                'end': item,
            })
        })
    };

    render(){
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];
        let activityCategory = ['Project','Non-Project'];
        let durationTime = ['30 mins','1 hr','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs'];
        console.log("*********inside modal content********",this.props)
        return(
            <div>{
                this.state.showCalendar ?
                    <div className="wrapper-calendar">
                        <BigCalendar
                            selectable
                            events={newEvents}
                            views={['month']}
                            onSelectSlot = { (slot) => this.selectSlot(slot)}
                        />
                        <button onClick={(e) => this.saveRepeat(e)}>Save </button>
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
                        Description:<input type="text"/>
                        Collaborators : <input type="text"/>
                        {
                            this.state.savedEvent ?
                                <button onClick={(e) => this.repeatEvent(e)}>Repeat </button>
                                :
                                <button onClick={(e) => this.saveEvent(e)}>Save</button>
                        }
                    </div>
                 }
            </div>
        )
    }
}

// export default ModalContent;

export default ModalComponent(ModalContent);
