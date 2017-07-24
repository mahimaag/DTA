import React, { Component } from 'react';

import Calendar from '../components/Calendar'

class Main extends Component {

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <Calendar lastDate={new Date('07/27/2017')}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Main