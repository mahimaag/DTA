/**
 * Created by saubhagya on 24/7/17.
 */

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import LogDropdown from '../../Core/Dropdown/index'
//import { TSMS_IconButton } from './../../Core/Button'
import {TimeEntryStatus} from '../../../constants/Index'
//import MultiSelectDropdown from '../../Core/MultiSelectDropDown'
import TtnButton from 'core/Button/btn';
import Tags from '../../Core/ReactTags'

class NewLogComp extends Component{
    constructor(){
        super();

        this.state = {
            newLogType: 'Select',
            newLogHH: 'Select',
            newLogMM:'Select',
            newLogDesc: '',
            newLogStatus: TimeEntryStatus.New,
            newCollaborators: []

        }
    }

    onValueChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onDoneClick = () => {
        if(this.state.newLogType === 'Select' || this.state.newLogHH === 'Select' || this.state.newLogMM === 'Select'){
            alert('All fields except description is mandatory to fill.');
        }
        else{
            let newLogObj = {
                date: this.props.logDate,
                activityType: this.state.newLogType,
                hh: this.state.newLogHH,
                mm:this.state.newLogMM,
                description: this.state.newLogDesc,
                status: TimeEntryStatus.Submitted,
                collaborators: this.state.newCollaborators,
                isProject:1
            };
            this.props.newLogCreated(newLogObj);
        }
    }

    onCloseClick = () => {
            this.setState({
                newLogType: 'Select',
                newLogHH: 'Select',
                newLogMM: 'Select',
                newLogDesc: '',
                newLogStatus: TimeEntryStatus.New,
                newCollaborators: []
            });
            this.props.closedWithoutCreate();
        }

    setSelectedValue = (item, property) => {
        this.setState({
            [property]: item
        })
    }

    /*onSelectedVal = (newCollab) => {
        (this.state.newCollaborators.length && this.state.newCollaborators.indexOf(newCollab) > -1) ? null : this.state.newCollaborators.push(newCollab);
        this.setState({newCollaborators: this.state.newCollaborators});
    };

    onDeleteCollab = (deletedVal) => {
        this.state.newCollaborators.splice(this.state.newCollaborators.indexOf(deletedVal), 1);
        this.setState({
            newCollaborators: this.state.newCollaborators
        })
    }*/

    getTags = (tags) => {
        let empSet = new Set();
        tags.forEach(obj => {
            empSet.add(obj.id);
        });
        this.setState({
            newCollaborators: [...empSet]
        });
    }

    render(){
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];
        let durationTimeHH = [1,2,3,4,5,6,7,8];
        let durationTimeMM = [10,20,30,40,50];
        //let newCollabArray = ['Gaurav','Rubi','Mahima','Nitin'];
        return(
            <div className = "data-div">
                <Row>
                    <Col md = {2} lg = {2} className = "log-col">
                        <LogDropdown className = 'type'
                                     data = {activityTitles}
                                     title = {this.state.newLogType}
                                     onSelect = {(item) => this.setSelectedValue(item, 'newLogType')}/>
                    </Col>
                    <Col md = {3} lg = {3} className = "log-col">
                        <LogDropdown className = 'duration'
                                     data = {durationTimeHH}
                                     title = {this.state.newLogHH}
                                     onSelect = {(item) => this.setSelectedValue(item, 'newLogHH')}/>Hrs
                        <LogDropdown className = 'duration'
                                     data = {durationTimeMM}
                                     title = {this.state.newLogMM}
                                     onSelect = {(item) => this.setSelectedValue(item, 'newLogMM')}/>Mins
                    </Col>
                    <Col md = {4} lg = {4} className = "log-col">
                        <input type = "text"
                               name = "newLogDesc"
                               value = {this.state.newLogDesc}
                               onChange = {this.onValueChange.bind(this)}/>
                    </Col>
                    <Col md = {1} lg = {1} className = "log-col">
                        <span>{this.state.newLogStatus}</span>
                    </Col>
                    <Col md = {2} lg = {2} className = "log-col">
                        <TtnButton iconButton
                                   level = "secondary"
                                   rounded icon = "glyphicon glyphicon-ok"
                                   onClick = {() => this.onDoneClick()}/>


                        <TtnButton nature = "Decline"
                                   onClick = {() => this.onCloseClick()}/>
                        {/*<TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                         onClickFunc={() => this.onDoneClick()}
                         spanClass="glyphicon glyphicon-ok"/>

                        <TSMS_IconButton bClassName="btn btn-default btn-sm edit-clear-button"
                                         onClickFunc={() => this.onCloseClick()}
                                         spanClass="glyphicon glyphicon-remove"/>*/}


                    </Col>
                </Row>
                <Row>
                    <Col md = {12} lg = {12} className = "log-col">
                        {/*Collaborators: <MultiSelectDropdown collabArray = {newCollabArray}
                                                            newCollab = {this.state.newCollaborators}
                                                            title = 'Select'
                                                            onSelectedVal = {(newCollab) => {this.onSelectedVal(newCollab)}}
                                                            onDeleteCollab = {(deletedVal) => {this.onDeleteCollab(deletedVal)}}/>*/}
                        Collaborators: <Tags updateTag = {(tags) => {this.getTags(tags)}}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NewLogComp;