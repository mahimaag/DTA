import React, { Component } from 'react';
import styles from './style.css';
import {connect} from "react-redux";
import {searchActivity,searchPermit,display} from "../../actions/activity.actions"

class TypeAhead extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }
    handleChange = (e) => {
        const value = e.target.value;
        if(value.length >= 2) {
            this.props.searchActivity(value, this.props.month);
            this.props.searchPermit(true);
            this.props.display('list');
            this.setState({searchText: value});
        }else{
            this.props.searchPermit(false)
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
        const { searchText } = this.state;

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
                    defaultValue={searchText}
                />
                <span className={`${icon.name}` +' ' +`${icon.position}`}></span>
                {/*{renderList}*/}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    isFetching: state.activity.isFetching,
    currentView: state.activity.currentView,
});
const mapDispatchToProps = (dispatch) => ({
    searchActivity : (textValue,month) => dispatch(searchActivity(textValue,month)),
    searchPermit : (value) => dispatch(searchPermit(value)),
    display: (currentView) => dispatch(display(currentView))
});

export default connect(mapStateToProps , mapDispatchToProps)(TypeAhead)

