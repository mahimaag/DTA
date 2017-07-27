/**
 * Created by saubhagya on 24/7/17.
 */

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import LogDropdown from './../../Core/Dropdown/LogDropdown'
import { TSMS_IconButton } from './../../Core/Button'
import {TimeEntryStatus} from '../../../constants/Index'


class NewLogComp extends Component{
    constructor(){
        super();

        this.state = {
            newLogActivity: 'Select',
            newLogType: 'Select',
            newLogDuration: 'Select',
            newLogDesc: '',
            newLogStatus: TimeEntryStatus.Pending,
            display: true,

        }
    }

    onValueChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onDoneClick = () => {
        if(this.state.newLogActivity === 'Select' || this.state.newLogType === 'Select' || this.state.newLogDuration === 'Select' ){
            alert('All fields except description is mandatory to fill.');
        }
        else{
            let newLogStatus = this.props.sampleDataStatus;
            let newLogObj = {
                Id: Date.now(),
                Activity: this.state.newLogActivity,
                Type: this.state.newLogType,
                Duration: this.state.newLogDuration,
                Description: this.state.newLogDesc,
                Status: this.state.newLogStatus
            }
            newLogStatus = TimeEntryStatus.Committed;
            this.props.newLogCreated(newLogObj,newLogStatus);


            this.setState({
                newLogActivity: 'Select',
                newLogType: 'Select',
                newLogDuration: 'Select',
                newLogDesc: '',
                newLogStatus: TimeEntryStatus.Pending,
            })
        }

    }

    onCloseClick = () => {
        if(this.state.display === true){
            this.setState({
                display: false,
                newLogActivity: 'Select',
                newLogType: 'Select',
                newLogDuration: 'Select',
                newLogDesc: '',
                newLogStatus: TimeEntryStatus.Pending,
            },() => {
                console.log('no new entry created');
            })
            let newLogStatus = this.props.sampleDataStatus;
            newLogStatus = TimeEntryStatus.Committed;
            this.props.closedWithoutCreate(newLogStatus);
        }

    }

    /*getSeletedValue = (selectedItem) => {
        if(selectedItem === 'Project' || selectedItem === 'Non-Project'){
            this.setState({
                newLogActivity: selectedItem
            })
        }
        else if(selectedItem === '30 mins' || selectedItem === '1 hr'
            || selectedItem === '2 hrs' || selectedItem === '3 hrs'
            || selectedItem === '4 hrs' || selectedItem === '5 hrs'
            || selectedItem === '6 hrs' || selectedItem === '7 hrs' || selectedItem === '8 hrs'){
            this.setState({
                newLogDuration: selectedItem
            })
        }
        else{
            this.setState({
                newLogType:selectedItem
            })
        }
        /!*this.setState({
         selectedValue: selectedItem
         },() => {
         console.log('value in activityLogComp------------------',this.state.selectedValue);
         })*!/
    }*/

    setSelectedValue = (item, property) => {
        this.setState({
            [property]: item
        })
    }

    render(){
        console.log('#####################3',this.props);
        let activityCategory = ['Project','Non-Project'];
        let durationTime = ['30 mins','1 hr','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs'];
        let sampleData = this.props.sampleData;
        let typeArray = [];
        sampleData.forEach(function(item){
            typeArray.push(item.Type);
        })
        return(
            <div>
                {this.state.display === true?
                    <div className="data-div">
                        <Col md={1} lg={1} className="log-col">
                            <LogDropdown className='activity'
                                         data={activityCategory}
                                         title={this.state.newLogActivity}
                                         onSelect={(item) => this.setSelectedValue(item, 'newLogActivity')}/>
                        </Col>
                        <Col md={2} lg={2} className="log-col">
                            <LogDropdown className='type'
                                         data={typeArray}
                                         title={this.state.newLogType}
                                         onSelect={(item) => this.setSelectedValue(item, 'newLogType')}/>
                        </Col>
                        <Col md={1} lg={1} className="log-col">
                            <LogDropdown className='duration'
                                         data={durationTime}
                                         title={this.state.newLogDuration}
                                         onSelect={(item) => this.setSelectedValue(item, 'newLogDuration')}/>
                        </Col>
                        <Col md={3} lg={4} className="log-col">
                            <input type="text" name="newLogDesc" value={this.state.newLogDesc} onChange={this.onValueChange.bind(this)}/>
                        </Col>
                        <Col md={1} lg={1} className="log-col">
                            <span>{this.state.newLogStatus}</span>
                        </Col>
                        <Col md={2} lg={2} lgOffset={1} className="log-col">
                            <TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                                             onClickFunc={() => this.onDoneClick()}
                                             spanClass="glyphicon glyphicon-ok"/>

                            <TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                                             onClickFunc={() => this.onCloseClick()}
                                             spanClass="glyphicon glyphicon-remove"/>


                        </Col>
                    </div>: null
                }

            </div>
        );
    }
}

export default NewLogComp;