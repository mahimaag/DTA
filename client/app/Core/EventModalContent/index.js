// Component having content to be shown on modal when any event is clicked

import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import ModalComponent from './../CustomModal'
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
                        <TtnButton level="primary" title="Done" />
                        <TtnButton level="primary" title="Cancel" onClick={(e) => this.cancelEdit(e)}/>
                    </div> :
                    <div>
                        {this.props.eventInfo.title}
                        <TtnButton level="primary" title="Edit" onClick={(e) => this.onEdit(e)}/>
                        <TtnButton level="primary" title="Delete" onClick={(e) => this.deleteEvent(e)}/>
                    </div>
            }
            </div>
        )
    }
}

export default ModalComponent(ModalContent);
