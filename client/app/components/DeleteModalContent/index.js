/**
 * Created by saubhagya on 24/8/17.
 */
import React, { Component } from 'react'
import TtnButton from 'core/Button/btn';

class DeleteModalContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            deleteStart: this.props.deleteLog
        }

    }

    deleteLog = () => {

    }

    close = () => {

    }

    render(){
        return(
            <div>
                <TtnButton bClassName = "log-clear-button"
                           level = "primary"
                           title = "Yes"
                           onClick = {this.deleteLog}/>

                <TtnButton bClassName = "log-clear-button"
                           level = "primary"
                           title = "No"
                           onClick = {this.close}/>
            </div>
        )
    }
}

export default DeleteModalContent;