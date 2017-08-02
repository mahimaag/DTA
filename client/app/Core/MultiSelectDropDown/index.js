/**
 * Created by saubhagya on 1/8/17.
 */

import React, { Component } from 'react';

class MultiSelectDropdown extends Component{
    constructor(){
        super();
        this.state = {
            dataSelected : false,
        }
    }

    onSelectedVal = (event) => {
        this.setState({
            dataSelected: true,
        });
        this.props.onSelectedVal(event.target && event.target.value);
    };

    onCloseCollabClick = (event) => {
        this.props.onCloseCollabClick(event.target.value);
    }

    render(){
        return(
            <div>
                {this.state.dataSelected === true ?
                    <div>{this.props.newCollab.map((item, index) => {
                        return (
                            <button key={index} value={item} onClick={(item) => {this.onCloseCollabClick(item)}}>{item}
                                <span className="glyphicon glyphicon-remove"></span>
                            </button>)
                    })}
                    </div>:null
                }
                <div>
                    <select value={this.props.title} onChange={(e) => {this.onSelectedVal(e)}}>
                        <option>Select</option>
                        {this.props.collabArray.map((item, index) => {
                            return (<option value={item} key={index}>{item}</option>)
                        })}
                    </select>
                </div>
            </div>
        );
    }
}

export default MultiSelectDropdown;
