// Component having content to be shown on modal when any event is clicked

import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import TtnButton from 'core/Button/btn';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
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

    render() {
        return (
            <div>{
                this.state.edit ?
                    <div>
                        <input type="text" value={this.props.eventInfo.title}/>
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
