import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

/*
import events from './../../config/events'
import styles from './style.css';
import AddButton from './../../Core/PlusButton'
*/

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);


let msg = {
    showMore: total => `+${total} ...`
};

class Calendar extends Component {
    constructor(props){
        super(props)
        this.state = {
            showEventModal : false
        }
    }
    eventStyleGetter(event, start, end, isSelected) {
        let cssClass;
        if (event.title === 'img') {
            cssClass = 'flag'
        }
        return {
            className:cssClass,

        };
    }
    onselectSlot(slot) {
        console.log("selected slot",slot)
    } //called when tile is clicked
    onselectEvent(slotId) {
        console.log("event selected",slotId);
        this.setState({
            showEventModal : true
        })
    } //called when event is clicked

    render() {
        return (
            <div>
                <BigCalendar
                    selectable
                    events={this.props.events}
                    popup
                    views={['month']}
                    messages={msg}
                    components={this.props.getComponents(this.props)}
                    onSelectSlot = { (slot) => this.onselectSlot(slot)}
                    onSelectEvent={(event) => this.onselectEvent(event)}
                    eventPropGetter={(this.eventStyleGetter)}
                />
            </div>
        )
    }
}

export default Calendar


