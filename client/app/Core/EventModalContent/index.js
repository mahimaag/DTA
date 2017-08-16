// Component having content to be shown on modal when any event is clicked

import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import TtnButton from 'core/Button/btn';
import Dropdown from './../Dropdown'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            duration:'',
        }
    }

    onEdit = (event) => {
        event.preventDefault();
        this.setState({
            edit: true
        })
    };

    cancelEdit = (event) => {
        event.preventDefault();
        this.setState({
            edit: false
        })
    };

    deleteEvent = (event) => {
        event.preventDefault();
        console.log("Delete :",this.props.eventInfo)
    };

    setSelectedValue = (item, property) => {
        this.setState({
            [property]: item
        })
    };

    render() {
        let titles=[];
        let durationTime = ['30 mins','1 hr','2 hrs','3 hrs','4 hrs','5 hrs','6 hrs','7 hrs','8 hrs'];
        titles = this.props.eventInfo.title.split('-');
        return (
            <div>{
                this.state.edit ?
                    <div>
                        <Dropdown data={durationTime}
                                  title={titles[0]}
                                  onSelect={(item) => this.setSelectedValue(item,'duration')}
                        />
                        <input type="text" value={titles[1]}/>
                        <TtnButton iconButton
                                   level="secondary"
                                   rounded icon ="glyphicon glyphicon-ok"
                        />
                        <TtnButton iconButton
                                   level="secondary"
                                   rounded icon ="glyphicon glyphicon-remove"
                                   onClick={this.cancelEdit}/>
                    </div> :
                    <div>
                        {this.props.eventInfo.title}
                        <TtnButton iconButton
                                   level="secondary"
                                   rounded icon ="glyphicon glyphicon-pencil"
                                   onClick={this.onEdit}/>
                        <TtnButton iconButton
                                   level="secondary"
                                   rounded icon ="glyphicon glyphicon-trash"
                                   onClick={this.deleteEvent}/>
                    </div>
            }
            </div>
        )
    }
}

export default ModalContent;
