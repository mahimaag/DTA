import React, { Component } from 'react';
import styles from './style.css';

class TypeAhead extends Component{
    constructor(){
        super();
        this.state = {
            searchedList: [],
            textValue: ''
        }
    }

    handleChange = (event) => {
        this.setState({textValue: event.target.value});
        this.props.handleChange(event.target.value);
    };

    showItemDetails = (item) => {
        this.setState({textValue: this.props.valueGenerator(item)});
        this.props.searchItem(item)
    };

    getDefaultComponent = () => {
        return (
            this.props.searchedList.map((item, index) => <div key={index} onClick={() => this.showItemDetails(item)}>{this.props.valueGenerator(item)}</div>)
        )
    };

    render(){
        const WrappedComponent = this.props.wrappedComponenent;
        return(
            <div className="typeahead-container">
                <input type="text"
                       placeholder="item..."
                       className="form-control" onChange={(e) => this.handleChange(e)} value={this.state.textValue}/>
                <span className={`${this.props.icon.name}` +' ' +`${this.props.icon.position}`}></span>
                {this.props.wrappedComponenent ?
                    <WrappedComponent searchedList={this.props.searchedList} displayText={this.props.valueGenerator} showItemDetails={(item) => this.showItemDetails(item)}/>
                : this.getDefaultComponent()}
            </div>
        );
    }
}

export default TypeAhead;
