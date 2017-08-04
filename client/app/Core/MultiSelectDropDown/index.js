/**
 * Created by saubhagya on 1/8/17.
 */

import React, { Component } from 'react';

class MultiSelectDropdown extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                {this.props.newCollab.map((item, index) => {
                    return (
                        <button key={index} value={item} onClick={(event) => this.props.onDeleteCollab(item)}>{item}
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>)
                })}

                <div>
                    <select value={this.props.title} onChange={(event) => {this.props.onSelectedVal(event.target.value)}}>
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
