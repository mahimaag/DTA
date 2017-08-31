import React, { Component } from 'react'

class ActivityAutoComplete extends Component{
    render () {
        const { searchedList, showItemDetails, displayText } = this.props
        return(
            <ul className="typeahead dropdown-menu" role="listbox" style={{display: 'block'}}>
                {
                    searchedList && searchedList.map((item, index) => (
                    <li key={index}>
                        <a
                            className="dropdown-item"
                            onClick={() => showItemDetails(item)}
                            role="option"
                        >
                            {displayText(item)}
                        </a>
                    </li>
                    ))
                }
            </ul>

        );
    }
}

export default ActivityAutoComplete;

