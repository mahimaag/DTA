import React, { Component } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from '../config/events'
import './cal_c.css';

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

let clicked = (props) => {
    event.preventDefault();
    let dated = props.date.getMonth()+1+'/'+props.date.getDate()+'/'+props.date.getFullYear();
    events.push({
        'title': '8hrs on project work',
        'start': new Date(dated),
        'end': new Date(dated),
    });
};

let customHeader = (props) => {
    return (
        <div style={{color: 'black', background: 'grey'}}>
            { props && props.label }
        </div>
    );
};

let customDateHeader = (props) => {
    return (
        <div className="date-header clearfix" >
            <span>{ props && props.label }</span>
            <div onClick={(e) => clicked(props)}> + </div>
        </div>
    );
};

// let customDayWrapper = (props) => {
//     console.log('customDayWrapper -> ', props);
//     return (
//         <div style={{color: 'green'}}>
//             Hi
//         </div>
//     )
// }

function getComponents () {
    return {
        // event: customEvent,
        //  eventWrapper: customEventWrapper,
        //  dayWrapper: customDayWrapper,  // called when day format is displayed
        //  dateCellWrapper: customDateCellWrapper,
        month: {
            header: customHeader,
            // event: customEvent,
            dateHeader: customDateHeader
        }
    };
}

let msg = {
    showMore: total => `+${total} ...`
};

class Calendar extends Component {
    constructor(props){
        super();

    }
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
    // creaSlotAppuntamenti(slot) {
    //     console.log("selected slot",slot)
    // } //called when tile is clicked
    modificaSlotAppuntamenti(slotId) {
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
                    components={getComponents(events)}
                    onSelectEvent={(event) => this.modificaSlotAppuntamenti(event)}
                    eventPropGetter={(this.eventStyleGetter)}
                />
            </div>
        )
    }
}

export default Calendar


/*

import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

let customEventWrapper = (props) => {
    console.log('customEventWrapper -> ', props);
    const customEventStyles = {
        'border-style': 'dotted',
        'border-radius': 10,
        'border-color': 'blue'
    };
    return (
        <div style={ customEventStyles}
             onClick={(e) => console.log('customEventSelected ->', props)}
             title={props && props.event && props.event.desc}>
            { props && props.event && props.event.title }
        </div>
    )
}

let customDayWrapper = (props) => {
    console.log('customDayWrapper -> ', props);
    return (
        <div style={{background: 'green'}}>
            { props && props.event && props.event.title }
        </div>
    )
}

let customEvent = (props) => {
    console.log('customEvent -> ', props);
    return null;
// return (
// <div style={{background: 'cyan'}}>
// <strong>
// { props && props.title }
// </strong>
// </div>
// );
}

let customDateCellWrapper = (props) => {
    console.log('customDateCellWrapper -> ', props);
    return (
        <div style={{background: 'red'}}>
            { props }
        </div>
    );

}

let customDateHeader = (props) => {
    console.log('customDateHeader -> ', props);
    return (
        <div style={{color: 'red'}}>
            { props && props.label }
        </div>
    );

}

let customHeader = (props) => {
    console.log('customHeader -> ', props);
    return (
        <div style={{color: 'black', background: 'grey'}}>
            { props && props.label }
        </div>
    );
}

function getComponents () {
    return {
// event: customEvent,
        eventWrapper: customEventWrapper,
        dayWrapper: customDayWrapper,
// dateCellWrapper: customDateCellWrapper,
        month: {
            header: customHeader,
            event: customEvent,
            dateHeader: customDateHeader
        }
    };
}

let Basic = React.createClass({
    render(){
        return (
            <BigCalendar
                popup
                components={getComponents()}
                onSelectEvent={(data, e) => console.log('onSelectEvent - ', data)}
                {...this.props}
                events={events}
                views='month'
                defaultDate={new Date(2015, 3, 1)}
            />
        )
    }
})

export default Basic;*/
