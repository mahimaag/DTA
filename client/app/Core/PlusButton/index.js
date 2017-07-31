import React, {Component} from 'react';

import CustomModal from './../CustomModal'

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
                        <CustomModal show={this.state.show}
                                     close={(e) => this.close(e)}
                                     message={this.props.currentDated.date.toString()}
                        /> : null
                }
            </div>
        );
    }
}

export default AddButton

