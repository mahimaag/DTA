import React, { Component } from 'react';
import styles from './style.css';
import {connect} from "react-redux";
import {searchActivity} from "../../actions/activity.actions"

class TypeAhead extends Component {
    constructor (props) {
        super(props);
        this.state = { searchText: '', showSearchResults: false }
    }
    handleChange = (e) => {
        const value = e.target.value;
        if(value.length >= 2) {
            this.props.searchActivity(value);
            this.setState({searchText: value, showSearchResults: true});
        } else {
            this.setState({searchText: value, showSearchResults: false});
        }
    };

    // showItemDetails = (item) => {
    //     this.setState({textValue: this.props.valueGenerator(item)});
    //     this.props.searchItem(item)
    // };

    // getDefaultComponent = () => {
    //     return (
    //         this.props.searchedList.map((item, index) => <div key={index} onClick={() => this.showItemDetails(item)}>{this.props.valueGenerator(item)}</div>)
    //     )
    // };

    render(){
        const { wrappedComponent, icon, searchedList, valueGenerator } = this.props;
        const { searchText } = this.state
        // const WrappedComponent = wrappedComponent;
        // const renderList = WrappedComponent
        // ? (
        //     <WrappedComponent
        //         searchedList={searchedList}
        //         displayText={valueGenerator}
        //         showItemDetails={this.showItemDetails}
        //     />
        // )
        // : this.getDefaultComponent()
        return (
            <div className="typeahead-container">
                <input
                    type="text"
                    placeholder="item..."
                    className="form-control"
                    onChange={this.handleChange}
                    value={searchText}
                />
                <span className={`${icon.name}` +' ' +`${icon.position}`}></span>
                {/*{renderList}*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    searchedList: state.activity.searchedList,
});

const mapDispatchToProps = (dispatch) => ({
    searchActivity : (textValue) => dispatch(searchActivity(textValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeAhead)

