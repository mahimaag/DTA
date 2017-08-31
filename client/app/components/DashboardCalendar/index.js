import React,{Component} from 'react'
import Calendar from 'components/Calendar'
import ModalComp from './../../Core/ModalComp'
import ModalContent from './../../Core/AddActivityModalContent'
import 'components/Calendar/style.css'
import TtnButton from 'core/Button/btn';
import {getDate} from './../../../utils/common'

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

    showModal = () => {
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
                        this.props.date.getMonth() === new Date().getMonth() && this.props.date < new Date() ?
                            <div className="modal-container">
                                <TtnButton level="secondary" title="+" onClick = {this.showModal}/>
                                <ModalComp modalShow={this.state.show}
                                           modalHide = {(e) => {this.close(e)}}
                                           modalHeaderMsg={"Add log on "+getDate(this.props.date).toString()}
                                           modalBody = {<ModalContent message={this.props.date} close={this.close}/>}
                                           modalFooterClose = {this.close}
                                           modalFooterText = 'Close'
                                />
                            </div>:null
                    }
                </span>
            </div>
        );
    }
}


let getComponents  = (props) => {
    return {
       month: {
            header: customHeader,
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
            <Calendar
                events={this.props.events}
                messageDecoration = {this.props.messageDecoration}
                getComponents = {(props) => getComponents(props)}
                month = {this.props.month}
                date={this.props.date}
            />

        )
    }
}

export default DashboardCalendar