/**
 * Created by saubhagya on 4/8/17.
 */

import React,{Component} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

class ModalComp extends Component{
    constructor(){
        super();
    }

    render(){

        //console.log('modal visibility----',this.props.modalShow);
        return(
            <Modal
                className = {this.props.modalClassName}
                show={this.props.modalShow}
                onHide = {this.props.modalHide}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">{this.props.modalHeaderMsg}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.modalBody}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.modalFooterClose}>{this.props.modalFooterText}</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalComp;



