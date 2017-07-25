import React, { Component } from 'react';
import NotificationCards from '../components/NotificationCards';

import Calendar from '../components/Calendar'

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
                        <div className="text-center m-t-lg">
                            <div className="col-md-4 pull-right">
                                <NotificationCards/>
                            </div>
                            <Calendar lastDate={new Date('07/27/2017')}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Main
