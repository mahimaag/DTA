import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal'

class CustomModal extends Component{
    constructor(props){
        super(props)
    }
    render(){

        return(
            <Modal
                show={this.props.show}
                onHide={this.props.close}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Event is added on {this.props.message}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.close}>Close</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CustomModal