/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { Row, Col} from 'react-bootstrap'
//import { TSMS_TextButton } from './../../Core/Button'
import TtnButton from 'core/Button/btn';
import {monthArray} from '../../../constants/Index'
import {getDate} from '../../../utils/common'
import moment from 'moment'
import {deleteAllActivity} from '../../actions/activity.actions'
import { connect } from 'react-redux';
import ModalComp from '../../Core/ModalComp'
import DeleteModal from '../../Core/DeleteModal'

class ActivityLogHeader extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayModal: false
        }
    }

    onClearClick = (activity) => {
        this.setState({
            displayModal: true
        })
    }

    onCloseModalClick = () => {
        this.setState({
            displayModal: false
        })
    }

    clearAllLogs = () => {
        this.props.deleteAllActivity(this.props.logDate);
        this.setState({
            displayModal: false
        })
    };

    render(){
        let activityArray = this.props.activities;
        let totalHours = 0,totalMins = 0;
        activityArray.map(function(activity){
            totalHours=totalHours+activity.hh;
            totalMins=totalMins+activity.mm;
            while(totalMins >= 60){
                totalHours=totalHours+1;
                totalMins = totalMins-60;
            }
        })
        let date = new Date(this.props.logDate);
        let formattedDate = getDate(date);
        let logDay = moment(formattedDate).format('ddd');
        return(
            <div>
                <Row className = "show-grid">
                    <Col md = {2} lg = {2} className = "log-col">
                        <span className = "log-date-day">{formattedDate}</span>
                        <span className = "log-date-day">{logDay}</span>
                    </Col>
                    <Col md = {2} lg = {2} lgOffset = {1} className = "log-col">
                        <span>{totalHours} : {totalMins}</span>
                    </Col>
                    <Col md = {4} lg = {4} lgOffset = {3} className = "log-col">
                        <TtnButton bClassName = "log-clear-button"
                                   level = "primary"
                                   title = "Log Time"
                                   onClick = {this.props.onLogTimeClick}/>:

                        <TtnButton bClassName = "log-clear-button"
                                   level = "primary"
                                   title = "Clear"
                                   onClick = {this.onClearClick}/>


                    </Col>
                </Row>

                <ModalComp modalClassName = 'inmodal'
                           modalShow = {this.state.displayModal}
                           modalHide = {() => {this.onCloseModalClick()}}
                           modalHeaderMsg = "Activity Deleted successfully"
                           modalBody = {<DeleteModal deleteActivity={this.clearAllLogs} close={this.onCloseModalClick}/>}
                           modalFooterClose = {() => {this.onCloseModalClick()}}
                           modalFooterText = 'Close'
                />
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteAllActivity : (date) => {dispatch(deleteAllActivity(date))}
});

export default connect(null, mapDispatchToProps)(ActivityLogHeader);
