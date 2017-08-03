import React from 'react';

import events from './../../config/events'
import NotificationCards from './../../components/NotificationCard';
import { correctHeight, detectBody } from './../../../utils/common';
import DashboardCalendar from './../../components/DashboardCalendar';
import ActivityLog from './../../components/ListActivityCard';

class Main extends React.Component {
    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <div className="col-lg-9 pull-left">
                                <DashboardCalendar
                                    events={events}/>
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
