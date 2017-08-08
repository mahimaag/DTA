import React, { Component } from 'react';
import { ToastContainer, ToastMessage } from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class Alert extends Component {
    constructor( props ){
        super( props );
        this.state={
            alertType:'',
            message:''
        }
    };

    componentWillMount () {
        console.log("props in alert  in will mount",this.props);
        // this.alert(this.props.alertType,this.props.message);
        const { alertType, message } = this.props;
        this.setState({ alertType:alertType, message: message }, ()=> {
            this.alert( this.state.alertType,this.state. message );
        });
    }

    componentWillReceiveProps ( nextProps ) {
        console.log("props in alert  in receive props",this.props);
        // this.alert(this.props.alertType,this.props.message);
        let alert, msg;
        alert = this.props.alertType;
        this.setState({ alertType: nextProps.alertType, message: nextProps.message }, ()=> {
            this.alert(  this.state.alertType,this.state. message );
        });
    };

    alert = (  type, message ) => {
        if ( type == "error" ) {
            this.errorAlert(message);
            return;
        }
        if ( type == "success" ) {
            this.successAlert( message );
            return;
        }
    };

    errorAlert = ( message ) => {
        this.refs.container.error(`${ message }`, ` `, {
            closeButton: true,
        });

    };


    successAlert = ( message ) => {
        this.refs.container.success(`${ message }`, ` `, {
            closeButton: true,
        });

    };

    render(){
        console.log("*******toastr called***********",this.state);
        return(
            <ToastContainer
                toastMessageFactory={ToastMessageFactory}
                ref="container"
                className="toast-top-right"
            />
        );
    };
}