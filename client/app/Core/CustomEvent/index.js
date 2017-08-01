import React, { Component } from 'react';

class CustomEvent extends React.Component {
    constructor(props){
        super(props)
    }


    render(){

        let popoverClickRootClose = (
            <Popover id="popover-trigger-click-root-close" style={{zIndex:10000}}>
                <strong>Holy guacamole!</strong> Check this info.
            </Popover>
        );

        return (
            <div>
                <OverlayTrigger id="help" trigger="click" rootClose container={this} placement="bottom" overlay={popoverClickRootClose}>
                    <div>{this.props.event.title}</div>
                </OverlayTrigger>

            </div>
        );
    }
}

export default CustomEvent
