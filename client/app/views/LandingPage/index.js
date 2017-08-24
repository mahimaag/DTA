import React from 'react';
import {connect} from 'react-redux'

import NotificationCards from 'components/NotificationCard';
import { correctHeight, detectBody } from './../../../utils/common';
import DashboardCalendar from 'components/DashboardCalendar';
import ActivityLog from 'components/ListActivityCard';
import TtnButton from 'core/Button/btn';
import TypeAhead from './../../Core/TypeAhead'
import ActivityAutoComplete from './../../Core/ActivityAutoComplete'
import {getActivities} from './../../actions/activity.actions'

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchedList: [],
            textValue: '',
        }
    }

    componentWillMount () {
        // get events/activities from db
        this.props.getActivities();
    }


    handleChange = (item) => {
        let itemList = [];
        item ? itemList = [{id: 1, name: "item 1"}, {id: 2, name: "item 2"},{id: 3, name: "item 3"}, {id: 4, name: "item 4"}] : itemList = [];
        setTimeout(() => this.setState({searchedList: itemList}), 500)
    };

    searchItem = (item) => {
      this.setState({searchedList: []})
    };

    displayText = (item) => {
        return item.name + ' : ' + item.id;
    };
    mapDataToEvents = () => {
        let events = [];
        if(this.props.activity && this.props.activity.activities.length >0){
            const timeLogs = this.props.activity.activities;
            timeLogs.map((dates) => {
                dates.activities.map((tasks) => {
                    events.push({
                        title : `${tasks.hh} - ${tasks.activityType}`,
                        start: new Date(dates._id),
                        end:new Date(dates._id),
                        moreInfo :tasks
                    })
                })
            })
        }
        console.log("events are :",events)
        return events;
    };
    render() {
        let events = this.mapDataToEvents();
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <div className="col-lg-9 pull-left">

                                <div className="col-lg-9 pull-left ">
                                    <TypeAhead wrappedComponenent={ActivityAutoComplete} apiPath="apiPath"
                                               icon={{name: "glyphicon glyphicon-search", position: 'place-right'}}
                                               handleChange={(item) => this.handleChange(item)} searchedList={this.state.searchedList}
                                               valueGenerator={this.displayText} searchItem={(item) => this.searchItem(item)}
                                    />
                                    <DashboardCalendar
                                        events={events}/>

                                    <ActivityLog activityTimeLog={this.props.activity.activities}/>
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
const mapDispatchToProps = (dispatch) => ({
    getActivities : () => {dispatch(getActivities())}
});
const mapStateToProps = (state) => {
    return {
        activity: state.activity
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Main);

