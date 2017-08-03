import React,{Component} from 'react'

import Calendar from './Calendar'
import ModalContent from '../Core/AddActivityModalContent'
import './Calendar/style.css'

let customHeader = (props) => {
    return (
        <div style={{color: 'black', background: 'grey'}}>
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
        // this.props.addEvent();
    };

    close = (e) => {
        e.preventDefault();
        this.setState({show: false})
    };
    render(){
        return (
            <div className="date-header clearfix" >
                <span>{ this.props.label }</span>
                <span>
                    {
                        this.props.date < new Date() ?
                            <div className="modal-container">
                                <button onClick={(e) => this.showModal(e)}>
                                    +
                                </button>
                                {
                                    this.state.show ?
                                        <ModalContent close={(e)=>this.close(e)} message={new Date()}/>:null
                                }
                            </div>:null
                    }



            </span>
            </div>
        );
    }

};

let getComponents  = (props) => {
    return {
        // event: customEvent,
        // eventWrapper: customEventWrapper,
        //  dayWrapper: customDayWrapper,  // called when day format is displayed
        //  dateCellWrapper: customDateCellWrapper,
        month: {
            header: customHeader,
            // event: customEvent,
            dateHeader: CustomDateHeader
        }
    };
};

class DashboardCalendar extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="wrapper-calendar">
                <Calendar
                    events={this.props.events}
                    getComponents = {(props) => getComponents(props)}
                />
            </div>
        )
    }
}

export default DashboardCalendar