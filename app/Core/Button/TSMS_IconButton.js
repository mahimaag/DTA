/**
 * Created by saubhagya on 25/7/17.
 */

import React, { Component } from 'react'

class TSMS_Button1 extends Component{
    constructor(){
        super()
    }

    render(){
        //console.log('this.props.in button 1===========',this.props);
        return(
            <button className={this.props.bClassName} onClick={this.props.onClickFunc}>
                <span className={this.props.spanClass}></span>
            </button>
        );
    }
}

export default TSMS_Button1;