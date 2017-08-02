/**
 * Created by saubhagya on 1/8/17.
 */

import React, { Component } from 'react';

class MultiSelectDropdown extends Component{
    constructor(){
        super();
        this.state = {
            dataSelected : false,
            nameVal:'Select'
        }
    }

    onSelectedVal = (event) => {
        let newVal = event.target.value;
        this.setState({
            dataSelected: true,
            nameVal:'Select'
        },() => {
            this.props.onSelectedVal(newVal);
        })


    }

    onCloseCollabClick = (event) => {
        //let deletedVal = event.target.value;
        this.props.onCloseCollabClick(event.target.value);
    }

    render(){
        //let nameArray = this.state.selectedVal;
        //console.log('props in multiselect----',this.state.selectedVal);
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
                    <select value={this.state.nameVal} onChange={(value) => {this.onSelectedVal(value)}}>
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
