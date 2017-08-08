import React,{Component} from 'react'

import Modal from 'react-bootstrap/lib/Modal'

export default function ModalComponent(WrappedComponent) {
    return class extends React.Component {
        render(){
            return(
                <Modal
                    show={this.props.showModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title">Log Time on {this.props.message.toString()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <WrappedComponent {...this.props}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.props.close}>Close</button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }
}


