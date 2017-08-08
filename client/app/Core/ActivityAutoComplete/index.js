import React, { Component } from 'react'

class ActivityAutoComplete extends Component{

    render(){
        return(
            <ul className="typeahead dropdown-menu" role="listbox" style={{display: 'block'}}>
                {this.props.searchedList && this.props.searchedList.map((item, index) => <li key={index}><a className="dropdown-item" onClick={() => this.props.showItemDetails(item)} role="option">{this.props.displayText(item)}</a></li>)}
            </ul>

        );
    }
}

export default ActivityAutoComplete;

