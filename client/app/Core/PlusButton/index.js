import React, {Component} from 'react';

import ModalContent from '../../Core/AddActivityModalContent'

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

    close = (e) => {
        e.preventDefault();
        this.setState({show: false})
    };

    render() {
        return (
            <div className="modal-container">
                <button onClick={(e) => this.showModal(e)}>
                    +
                </button>
                {
                    this.state.show ?
                        <ModalContent close={(e)=>this.close(e)} message={this.props.currentDated.date}/>:null
                }
            </div>
        );
    }
}

export default AddButton


