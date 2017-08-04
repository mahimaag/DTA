import React from 'react';
import NotificationCards from './../../components/NotificationCard';
import { correctHeight, detectBody } from './../../../utils/common';
import Calendar from './../../components/Calendar';
import ActivityLog from './../../components/ListActivityCard';
import TtnButton from 'core/Button/btn';
class Main extends React.Component {

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <div className="col-lg-9 pull-left ">
                                <Calendar />
                                <ActivityLog/>
                            </div>
                            <div className="col-md-3 pull-right">
                                <NotificationCards/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>List of components</h5>
                            </div>
                            <div className="ibox-content">
                                <div>
                                    <h3> Buttons </h3>
                                    <TtnButton level="primary" title="Flat Button"/>
                                    <TtnButton nature="Decline"/>
                                    <TtnButton iconButton level="primary" rounded icon="fa fa-address-book-o"/>
                                </div>
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
