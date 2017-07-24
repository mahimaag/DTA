import React, { Component } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

class Calendar extends Component {
    eventStyleGetter(event, start, end, isSelected) {
        let cssClass;
        if(event.title === ' ' && start < new Date()){
            cssClass = 'pending'
        }else if (event.title === 'img') {
            cssClass = 'flag'
        } else  if (event.title !== '8hrs'){
            cssClass = 'partial'
        }
        else {
            cssClass = 'completed'
        }

        let style = {
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block',
            height: '120px'
        };

        return {
            className:cssClass,
            style: style
        };
    }

    render() {
        const events = [
            {
                'title':'img',
                'start':this.props.lastDate,
                'end':this.props.lastDate

            },
            {
                'title': ' ',
                'start': new Date('07/10/2017'),
                'end': new Date('07/10/2017')
            },
            {
                'title': ' ',
                'start': new Date('07/12/2017'),
                'end': new Date('07/12/2017')
            },
            {
                'title': ' ',
                'start': new Date('07/13/2017'),
                'end': new Date('07/13/2017')
            },
            {
                'title': ' ',
                'start': new Date('07/14/2017'),
                'end': new Date('07/14/2017')
            },
            {
                'title': '8hrs',
                'start': new Date('07/03/2017'),
                'end': new Date('07/03/2017'),
            },
            {
                'title': '2hrs knowledge sharing session',
                'start': new Date('07/04/2017'),
                'end': new Date('07/04/2017'),
            },
            {
                'title': '8hrs',
                'start': new Date('07/05/2017'),
                'end': new Date('07/05/2017'),
            },
            {
                'title': '8hrs',
                'start': new Date('07/06/2017'),
                'end': new Date('07/06/2017'),
            },
            {
                'title': '8hrs',
                'start': new Date('07/07/2017'),
                'end': new Date('07/07/2017'),
            },
            {
                'title': '8hrs',
                'start': new Date('07/11/2017'),
                'end': new Date('07/11/2017'),
            },
            {
                'title': '4hrs',
                'start': new Date('07/17/2017'),
                'end': new Date('07/17/2017')
            },
            {
                'title': '4hrs',
                'start': new Date('07/18/2017'),
                'end': new Date('07/18/2017')
            },
            {
                'title': '8hrs',
                'start': new Date('07/19/2017'),
                'end': new Date('07/19/2017')
            }
        ];
        return (
            <BigCalendar
                events={events}
                style={{height: 590}}
                eventPropGetter={(this.eventStyleGetter)}
            />
        )
    }

}

export default Calendar