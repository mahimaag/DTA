import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import EventModalContent from './../../Core/EventModalContent'
import AddActivityModal from './../../Core/AddActivityModalContent'
import ModalComp from './../../Core/ModalComp'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

let customHeader = (props) => {
    return (
        <div className="fc-day-header fc-widget-header ">
            { props && props.label }
        </div>
    );
};

class CustomDateHeader extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:false
        };
    }

    showModal = () => {
        this.setState({show: true});
    };

    close = () => {
        this.setState({show: false})
    };

    render(){
        return (
            <div className="fc-day-number fc-future date-header" >
                <span>{ this.props.label }</span>
                <span>
                    {
                        this.props.date < new Date() ?
                            <div className="modal-container">
                                <TtnButton level="secondary" title="+" onClick = {this.showModal}/>
                                <ModalComp modalShow={this.state.show}
                                           modalHide = {(e) => {this.close(e)}}
                                           modalHeaderMsg="Add Activity Log"
                                           modalBody = {<AddActivityModal message={this.state.eventSelected.start} eventInfo={this.state.eventSelected}/>}
                                           modalFooterClose = {(e) => {this.close(e)}}
                                           modalFooterText = 'Close'
                                />
                            </div>:null
                    }
                </span>
            </div>
        );
    }
}

let defaultComponent  = (props) => {
    return {
         month: {
            header: customHeader,
            dateHeader: CustomDateHeader   // refer source code DateHeader.js
        }
    };
};
class Calendar extends Component {
    constructor(props){
        super(props);
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
    onselectEvent(slotId) {
        this.setState({
            showEventModal : true,
            eventSelected : slotId
        })
    } //called when event is clicked
    closeCalendar  = () => {
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
                    messages={ this.props.messageDecoration }
                    components={this.props.getComponents(this.props) || this.defaultComponent(this.props)}
                    onSelectEvent={(event) => this.onselectEvent(event)}
                    eventPropGetter={(this.eventStyleGetter)}
                />
                <ModalComp modalShow={this.state.showEventModal}
                           modalHide = {this.closeCalendar}
                           modalHeaderMsg="Edit Event"
                           modalBody = {<EventModalContent message={this.state.eventSelected.start} eventInfo={this.state.eventSelected} closeCalendar={this.closeCalendar} month={this.props.month}/>}
                           modalFooterClose = {this.closeCalendar}
                           modalFooterText = 'Close'
                />
            </div>
        )
    }
}

export default Calendar


