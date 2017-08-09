import React,{Component} from 'react'

import Modal from 'react-bootstrap/lib/Modal'
import TtnButton from './../Button/btn'

export default function ModalComponent(WrappedComponent) {
    return class extends React.Component {
        render(){
            return(
                <Modal
                    show={this.props.showModal}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title">Log Time on {this.props.message.toString()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <WrappedComponent {...this.props}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <TtnButton title=" Close " level = "primary" onClick={this.props.close}/>
                    </Modal.Footer>
                </Modal>
            )
        }
    }
}


