import React, { Component } from 'react';
import NotificationCards from '../components/NotificationCards';

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
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Main
