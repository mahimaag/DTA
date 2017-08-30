
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import LogDropdown from '../../Core/Dropdown/index'
import {TimeEntryStatus} from '../../../constants/Index'
import TtnButton from 'core/Button/btn';
import Tags from '../../Core/ReactTags'

class NewLogComp extends Component{
    constructor(){
        super();

        this.state = {
            newLogType: 'Select',
            newLogHH: 'hh',
            newLogMM:'mm',
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
                newLogHH: 'hh',
                newLogMM: 'mm',
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
        let durationTimeMM = [0,10,20,30,40,50];
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
                        <LogDropdown className = 'duration time-hhmm'
                                     data = {durationTimeHH}
                                     title = {this.state.newLogHH}
                                     onSelect = {(item) => this.setSelectedValue(item, 'newLogHH')}/>:
                        <LogDropdown className = 'duration'
                                     data = {durationTimeMM}
                                     title = {this.state.newLogMM}
                                     onSelect = {(item) => this.setSelectedValue(item, 'newLogMM')}/>
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

                    </Col>
                </Row>
                <Row>
                    <Col md = {12} lg = {12} className = "log-col new-collab">
                        <span>Collaborators:</span> <Tags updateTag = {(tags) => {this.getTags(tags)}}/>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default NewLogComp;