import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import events from './../../config/events'
import styles from './style.css';
import AddButton from './../../Core/PlusButton'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

// let customEventWrapper = (props) => {
//     console.log('customEventWrapper -> ', props);
//     const customEventStyles = {
//         'border-style': 'dotted',
//         'border-radius': 10,
//         'border-color': 'blue'
//     };
//     return (
//         <div style={ customEventStyles}
//              onClick={(e) => console.log('customEventSelected ->', props)}
//              title={props && props.event && props.event.desc}>
//             { props && props.event && props.event.title }
//         </div>
//     )
// }
/*let clicked = (props) => {
 event.preventDefault();
 let dated = props.date.getMonth()+1+'/'+props.date.getDate()+'/'+props.date.getFullYear();
 events.push({
 'title': '8hrs on project work',
 'start': new Date(dated),
 'end': new Date(dated),
 });
 };*/
// let addEvent = (props) => {
//     /*let dated = props.date.getMonth() + 1 + '/' + props.date.getDate() + '/' + props.date.getFullYear();
//     events.push({
//         'title': '8hrs on project work',
//         'start': new Date(dated),
//         'end': new Date(dated),
//     });
//     console.log("date clicked is ---------", dated)*/
// };
let customHeader = (props) => {
    return (
        <div style={{color: 'black', background: 'grey'}}>
            { props && props.label }
        </div>
    );
};
let customDateHeader =(props) =>{
    return (
        <div className="date-header clearfix" >
            <span>{ props && props.label }</span>
            <span>
                {
                    props.date < new Date() ?
                        <AddButton currentDated={props}/>:null
                }
            </span>
        </div>
    );
};
/*(props) => {
 return (
 <div className="date-header clearfix" >
 <span>{ props && props.label }</span>
 {
 props.date < new Date() ?
 <a href="#" data-toggle="modal" data-target="#modalBill">+</a>:null
 }
 </div>

 );
 };*/
// let customDayWrapper = (props) => {
//     console.log('customDayWrapper -> ', props);
//     return (
//         <div style={{color: 'green'}}>
//             Hi
//         </div>
//     )
// }
let getComponents  = (props) => {
    return {
        // event: customEvent,
        // eventWrapper: customEventWrapper,
        //  dayWrapper: customDayWrapper,  // called when day format is displayed
        //  dateCellWrapper: customDateCellWrapper,
        month: {
            header: customHeader,
            // event: customEvent,
            dateHeader: customDateHeader
        }
    };
};
let msg = {
    showMore: total => `+${total} ...`
};

class Calendar extends Component {
    eventStyleGetter(event, start, end, isSelected) {
        let cssClass;
        if (event.title === 'img') {
            cssClass = 'flag'
        }else if (event.title === ''){
            cssClass = 'pending'
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
    } //called when event is clicked

    render() {
        return (
            <div className="wrapper-calendar">
                <BigCalendar
                    selectable
                    events={events}
                    popup
                    views={['month']}
                    messages={msg}
                    components={getComponents(this.props)}
                    onSelectSlot = { (slot) => this.onselectSlot(slot)}
                    onSelectEvent={(event) => this.onselectEvent(event)}
                    eventPropGetter={(this.eventStyleGetter)}
                />

            </div>
        )
    }
}

export default Calendar


