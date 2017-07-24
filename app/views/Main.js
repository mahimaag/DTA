import React, { Component } from 'react';
import NotificationCards from '../components/NotificationCards';
import DashboardCalendar from '../core/Calendar';
import events from '../MockData/events';

class Main extends Component {
    constructor(props){
        super(props);
        console.log('jksdhjhjbhj')
    }

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div>
                            <div className="col-md-7">
                                <DashboardCalendar events={events}/>
                            </div>
                        </div>
                        <div className="text-center m-t-lg">
                            <div className="col-md-4 pull-right">
                                <NotificationCards events={events}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Main
