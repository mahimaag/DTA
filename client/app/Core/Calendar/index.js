import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
let Popup = React.createClass({
  render(){
    return (
        <div>
            <BigCalendar
            popup
            views='month'
            events={this.props.events}
            defaultDate={new Date(2015, 3, 1)}
            />
        </div>
    )
  }
})

export default Popup;