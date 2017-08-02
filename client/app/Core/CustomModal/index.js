import React,{Component} from 'react'

/*import CustomModal from './../../Core/CustomModal'
 import ModalContent from './../../Core/AddActivityModalContent'*/
import Modal from 'react-bootstrap/lib/Modal'

/*class ModalComponent extends Component {
 render(){
 const TestModal = CustomModal(ModalContent);
 return(
 <Modal
 show={true}
 container={this}
 aria-labelledby="contained-modal-title"
 >
 <Modal.Header>
 <Modal.Title id="contained-modal-title">Log Time on {this.props.message}</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <TestModal/>
 </Modal.Body>
 <Modal.Footer>
 <button onClick={this.props.close}>Close</button>
 </Modal.Footer>
 </Modal>
 )
 }
 }*/

export default function ModalComponent(WrappedComponent) {
    return class extends React.Component {
        render(){
            return(
                <Modal
                    show={true}
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


