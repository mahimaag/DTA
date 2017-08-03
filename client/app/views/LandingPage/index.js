import React from 'react';

import events from './../../config/events'
import NotificationCards from './../../components/NotificationCard';
import { correctHeight, detectBody } from './../../../utils/common';
import Calendar from './../../components/Calendar';
import ActivityLog from './../../components/ListActivityCard';
import AddButton from './../../Core/PlusButton'

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
                        <AddButton currentDated={props}/>:null  //add action taken on add button click
                }
            </span>
        </div>
    );
};
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

class Main extends React.Component {
    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <div className="col-lg-9 pull-left">
                                <Calendar
                                    events={events}
                                    getComponents = {getComponents}
                                />
                                <ActivityLog/>
                            </div>
                            <div className="col-md-3 pull-right">
                                <NotificationCards/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }
}

export default Main
