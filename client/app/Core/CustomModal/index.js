import React, { Component } from 'react';

function CustomModal(WrappedComponent) {
    return WrappedComponent;
  /*return class extends Component {

        render() {
            console.log("inside11111 custom modal----------", WrappedComponent);
            return (
                <Modal

                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">LOG TIME ON </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <WrappedComponent/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button >Close</button>
                        <button >Save</button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }*/
}

export default CustomModal