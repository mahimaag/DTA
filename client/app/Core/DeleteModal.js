import React, {Component} from 'react'
import TtnButton from 'core/Button/btn';

class DeleteModal extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h3>Are you sure you want to delete this log?</h3>
                <p>Deleted logs cannot be recovered</p>
                <p>Note this will not delete the collaborator records</p>
                <TtnButton level="secondary" title="Yes" onClick = {this.props.deleteActivity}/>
                <TtnButton level="secondary" title="No" onClick = {this.props.close}/>
            </div>
        )
    }
}

export default DeleteModal