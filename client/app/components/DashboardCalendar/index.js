import React,{Component} from 'react'

import Calendar from 'components/Calendar'
import ModalContent from './../../Core/AddActivityModalContent'
import 'components/Calendar/style.css'
import TtnButton from 'core/Button/btn';

let customHeader = (props) => {
    return (
        <div className="fc-day-header fc-widget-header ">
            { props && props.label }
        </div>
    );
};

class CustomDateHeader extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:false
        };
    }

    showModal = (e) => {
        e.preventDefault();
        this.setState({show: true});
    };

    close = (e) => {
        e.preventDefault();
        this.setState({show: false})
    };

    render(){
        return (
            <div className="fc-day-number fc-future date-header" >
                <span>{ this.props.label }</span>
                <span>
                    {
                        this.props.date < new Date() ?
                            <div className="modal-container">
                                <TtnButton level="secondary" title="+" onClick = {this.showModal}/>
                                {
                                    this.state.show ?
                                        <ModalContent close={(e)=>this.close(e)} showModal={this.state.show} message={this.props.date}/>:null
                                }
                            </div>:null
                    }
                </span>
            </div>
        );
    }
}

let getComponents  = (props) => {
    return {
        // event: customEvent,
        // eventWrapper: customEventWrapper,
        //  dayWrapper: customDayWrapper,  // called when day format is displayed
        //  dateCellWrapper: customDateCellWrapper,
        month: {
            header: customHeader,
            // event: customEvent,
            dateHeader: CustomDateHeader   // refer source code DateHeader.js
        }
    };
};

class DashboardCalendar extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className=" ibox-content wrapper-calendar">
                <Calendar
                    events={this.props.events}
                    getComponents = {(props) => getComponents(props)}
                />
            </div>
        )
    }
}

export default DashboardCalendar