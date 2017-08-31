import React from 'react';
import {connect} from 'react-redux'

import NotificationCards from 'components/NotificationCard';
import { correctHeight, detectBody } from './../../../utils/common';
import DashboardCalendar from 'components/DashboardCalendar';
import ActivityLog from 'components/ListActivityCard';
import TtnButton from 'core/Button/btn';
import TypeAhead from './../../Core/TypeAhead'
import ActivityAutoComplete from './../../Core/ActivityAutoComplete'
import {getActivities,display} from './../../actions/activity.actions'
import CalendarNavigation from './../../components/CalendarNavigation'

const days = [31,28,31,30,31,30,31,31,30,31,30,31];

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchedList: [],
            textValue: '',
            switchBtn: false,
            missingLogs:new Date().getDate(),
            partialLogs:new Date().getDate(),
            month: new Date().getMonth()
        }
    }
    componentWillMount () {
        let date = new Date();
        let currentMonth = date.getMonth();
        this.props.getActivities(currentMonth);
    }


    searchItem = (item) => {
      this.setState({searchedList: []})
    };

    displayText = (item) => {
        return item.name + ' : ' + item.id;
    };

    previousEvents = () => {
        let newMonth = this.state.month -1;
        this.setState({
            month:newMonth
        },()=>{
            this.props.getActivities(this.state.month)
        })
    };

    nextEvents = () => {
        let newMonth = this.state.month +1;
        this.setState({
            month:newMonth
        },()=>{
            this.props.getActivities(this.state.month)
        })
    };

    todayEvents = () => {
        let newMonth = new Date().getMonth();
        this.setState({
            month:newMonth
        },()=>{
            this.props.getActivities(this.state.month)
        })
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
        return events;
    };
    onSwitchCal = () => {
        this.props.display('calendar');
        this.setState({
            month:new Date().getMonth()
        },()=>{
            this.props.getActivities(this.state.month)})
    };

    onSwitchList = () => {
        this.props.display('list');
    };
    render() {
        let events = this.mapDataToEvents();
        let msg = {
            showMore: total => `+${total} ...`,
            previous : <CalendarNavigation title="back" month={this.state.month} previousEvents={this.previousEvents}/>,
            today : <CalendarNavigation title="today" month={this.state.month} todayEvents={this.todayEvents}/>,
            next : <CalendarNavigation title="next" month={this.state.month} nextEvents={this.nextEvents}/>
        };
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <div className="col-lg-9 pull-left ">
                                <TypeAhead
                                    wrappedComponenent={ActivityAutoComplete}
                                    apiPath="apiPath"
                                    icon={{name: "glyphicon glyphicon-search", position: 'place-right'}}
                                    handleChange={this.handleChange}
                                    searchedList={this.state.searchedList}
                                    valueGenerator={this.displayText}
                                    searchItem={this.searchItem}
                                    month={this.state.month}
                                />

                                <div className="switch-cal-list">
                                    <button onClick = {this.onSwitchList}>List</button>

                                    <button onClick = {this.onSwitchCal}>Calendar</button>
                                </div>

                                {
                                  this.props.currentView === 'calendar' ?
                                    <DashboardCalendar
                                        events={events}
                                        messageDecoration={ msg }
                                        month={this.state.month}

                                    /> :
                                      <ActivityLog activityTimeLog={this.props.activity.activities} month={this.state.month}/>
                                }
                            </div>
                            <div className="col-md-3 pull-right">
                                <NotificationCards activity={this.props.activity} month={this.state.month} days={days[this.state.month]}/>
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
    getActivities: (currentMonth) => {dispatch(getActivities(currentMonth))},
    display: (currentView) => {dispatch(display(currentView))}
});
const mapStateToProps = (state) => ({
    activity: state.activity,
    currentView: state.activity.currentView,

});
export default connect(mapStateToProps, mapDispatchToProps)(Main);

