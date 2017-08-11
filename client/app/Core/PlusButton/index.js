import React, {Component} from 'react';

import ModalContent from '../../Core/AddActivityModalContent'
import ModalComp from './../ModalComp';

class AddButton extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
        }
    }

    showModal = (e) => {
        e.preventDefault();
        this.setState({show: true});
        this.props.addEvent();
    };

    close = () => {
        this.setState({show: false})
    };

    render() {
        return (
            <div className="modal-container">
                <button onClick={(e) => this.showModal(e)}>
                    +
                </button>
                <ModalComp modalClassName = 'inmodal'
                           modalShow = {this.state.show}
                           modalHide = {() => {this.close()}}
                           modalHeaderMsg = "Add Activity"
                           modalBody = {<ModalContent/>}
                           modalFooterClose = {() => {this.close()}}
                           modalFooterText = 'Close'/>
            </div>
        );
    }
}

export default AddButton


