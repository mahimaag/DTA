import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {connect} from 'react-redux'
import Dropdown from './../Dropdown'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import Tags from './../ReactTags'
import TtnButton from './../Button/btn';
import '../../components/Calendar/style.css'
import TsmsForm from './../Form';
import {TimeEntryStatus} from './../../../constants/Index'
import {postActivities} from './../../actions/activity.actions'
import {getDate} from './../../../utils/common'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);


class ModalContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCalendar:false,
            activityType:'Select',
            hh:'Select',
            mm:'Select',
            collaborators:[],
            description:'',
            repeatActivity : [],
            events:[{
                "title":'today',
                "start":new Date(),
                "end":new Date()
            }]
        }
    }

    selectSlot(slot) {
        if( JSON.stringify(slot.start) === JSON.stringify(this.props.message)){
            alert("Sorry...You cannot repeat event on same date")
        } else{
            let newRepeatedDates = this.state.repeatActivity;
            let newevents = this.state.events;

            if(newRepeatedDates.indexOf(+new Date(getDate(slot.start)))>=0){
                console.log(newRepeatedDates.indexOf(+new Date(getDate(slot.start))))
                newRepeatedDates.splice((newRepeatedDates.indexOf(+new Date(getDate(slot.start)))),1)
                newevents.map((item,index) => {
                    if(item.start===getDate(slot.start)&&item.end===getDate(slot.start)){
                        newevents.splice(index,1)
                    }
                })
            }else{
                newRepeatedDates.push(+new Date(getDate(slot.start)));
                newevents.push({
                    "title": " ",
                    "start": getDate(slot.start),
                    "end": getDate(slot.start)
                })
            }

            this.setState({
                repeatActivity:newRepeatedDates,
                events:newevents
            },()=>{
                console.log(this.state.repeatActivity)
            });
        }
    } // todo : change color of selected slot

    setSelectedValue = (item, property) => {
        this.setState({
            [property]: item
        })
    };

    repeatEvent = () => {
        if(this.state.hh === 'Select' || this.state.activityType === 'Select')
            alert("First fill all the fields!!!");
        else{
            this.setState({
                showCalendar:true,
            })
        }
    };

    saveEvent = (event) => {
        event.preventDefault();
        console.log("type is ",typeof (this.state.hh),typeof (this.state.mm));
        console.log("this.state.repeatActivity",this.state.repeatActivity)
        if(this.state.hh === 'Select' || this.state.activityType === 'Select'){
            alert("Fields cannot be empty")
        }else{
            let dated = getDate(this.props.message);
            let activityLog = {
                "activityType":this.state.activityType,
                "status":TimeEntryStatus.Submitted,
                "hh":this.state.hh,
                "mm":this.state.mm,
                "collaborators":this.state.collaborators,
                "description":this.state.description,
                "date":+ new Date(dated),
                "repeatActivity":this.state.repeatActivity
            };

            this.props.postActivities(activityLog);
            this.props.close(event);

        }
    };


    onInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    getTags = (tags) => {
        let empSet = new Set();
        tags.forEach(obj => {
            empSet.add(obj.id);
        });
        this.setState({
            collaborators: [...empSet]
        });
    }

    eventStyleGetterRepeat(event, start, end, isSelected) {
        let cssClass = "repeat-icon",todayClass = "current-date";
        if(event.title === " "){
            return { className:cssClass };
        }else{
            return{ className:todayClass }
        }
    }

    render(){
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];
        let hour = [1,2,3,4,5,6,7,8];
        let minutes = [0,10,20,30,40,50];
        return(
            <div>{
                this.state.showCalendar ?
                    <div className="repeatedCalendar">
                        <BigCalendar
                            selectable
                            events={this.state.events}
                            views={['month']}
                            toolbar={false}
                            onSelectSlot = { (slot) => this.selectSlot(slot)}
                            eventPropGetter={(this.eventStyleGetterRepeat)}
                        />
                        <button onClick={(e) => this.saveEvent(e)}>Save </button>
                    </div>:
                    <TsmsForm formClassName="add-activity">
                        <div>
                            <FormGroup controlId="activityType">
                                <ControlLabel>Activity Type:<span className="requiredField">*</span></ControlLabel>
                                <Dropdown data={activityTitles}
                                          title={this.state.activityType}
                                          onSelect={(item) => this.setSelectedValue(item,'activityType')}
                                />
                            </FormGroup>
                            <FormGroup controlId="hh">
                                <ControlLabel>HH:<span className="requiredField">*</span></ControlLabel>
                                <Dropdown data={hour}
                                          title={this.state.hh}
                                          onSelect={(item) => this.setSelectedValue(item,'hh')}/>
                            </FormGroup>
                            <FormGroup controlId="mm">
                                <ControlLabel>MM:<span className="requiredField">*</span></ControlLabel>
                                <Dropdown data={minutes}
                                          title={this.state.mm}
                                          onSelect={(item) => this.setSelectedValue(item,'mm')}/>
                            </FormGroup>
                            <FormGroup controlId="description">
                                <ControlLabel>Description:</ControlLabel>
                                <FormControl type="text" label="Description" placeholder="Description" value={this.state.description} onChange={this.onInputChange} name="description"/>
                            </FormGroup>
                            <FormGroup controlId="collaborators">
                                <ControlLabel>Collaborators: <Tags updateTag = {(tags) => {this.getTags(tags)}}/></ControlLabel>
                            </FormGroup>

                            <TtnButton level = "primary"
                                       title = "Repeat"
                                       onClick={(e) => this.repeatEvent(e)}/>
                            :
                            <TtnButton level = "primary"
                                       title = "Save"
                                       onClick={(e) => this.saveEvent(e)}/>

                        </div>

                    </TsmsForm>
            }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    postActivities : (activityLog) => {dispatch(postActivities(activityLog))}
});

export default connect(null,mapDispatchToProps)(ModalContent);
