import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import EventModalContent from './../../Core/EventModalContent'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

/*function CustomToolbar() {
    return (
        <div className="fc-toolbar">
            <div className="fc-center">
                Aug-Sept 2016
            </div>
        </div >
    )
}*/
//add custom toolbar in Calendar

let msg = {
    showMore: total => `+${total} ...`,
    };

class Calendar extends Component {
    constructor(props){
        super(props)
        this.state = {
            showEventModal : false,
            eventSelected : ''
        }
    }

    eventStyleGetter(event, start, end, isSelected) {
        let cssClass = "fc-day-grid-event fc-event  ";
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
            showEventModal : true,
            eventSelected : slotId
        })
    } //called when event is clicked
    close  = (event) => {
        event.preventDefault();
        this.setState({showEventModal:false})
    };

    render() {
        return (
            <div className=" ibox-content wrapper-calendar">
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
                {
                    this.state.showEventModal ?
                        <EventModalContent close = {(e) => this.close(e)} showModal = {this.state.showEventModal} message={this.state.eventSelected.start} eventInfo={this.state.eventSelected}/>:null
                }
            </div>
        )
    }
}
export default Calendar


