/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'
//import MenuItemList from './MenuItemList'

/*class LogDropdown extends Component{
    constructor(){
        super();

        this.state = {
            selected:'',
        }
    }

   /!* onSelectChange = (event) => {
        this.setState({
            selected:event.target.value
        },() => {
            this.props.onSelectChanged(this.state.selected);
        })
    }*!/

    render(){
        console.log("props for dropdown-------------------",this.props);
        let selectobject = this.props;
        let array =[];
        for (let i in selectobject) {
            array = selectobject[i];
            console.log('obj----------',array);
        }
        /!*for(let i in selectobject){
            console.log('i------',selectobject.i);
            let key = i;
            console.log('key',key);
            /!*for(let j=0; j<i[key].length; j++){
                console.log('############3',i[j]);
            }*!/
        }*!/
        return(
            /!*<ButtonToolbar>
                <DropdownButton bsSize="small" title="Select" id="dropdown-size-small">
                    <MenuItem eventKey="1">Action</MenuItem>
                    <MenuItem eventKey="2">Another action</MenuItem>
                    <MenuItem eventKey="3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4">Separated link</MenuItem>
                </DropdownButton>
            </ButtonToolbar>*!/
            <select className="dropdown" value={this.state.selected}>
                <option value="Select">Select</option>
               {array.map((item) => (<option value={item}>{item}</option>)
                )}
            </select>
        );
    }
}*/

class LogDropdown extends Component{
    constructor(){
        super();

        this.state = {
            displayMenuItems: false,
            openList: false,
            buttonDisabled: false,
            selectedListItem: 'Select'
        }
    }

    /*componentDidMount = () => {
        if(this.props.disabled === 'true'){
            //document.getElementById('dropdownButton').disabled = true;
            //this.refs.dropdownButton.disabled = true
            this.setState({
                buttonDisabled: true
            })
        }
        else{
            console.log('no disabled props ---------- CWM');
        }
    }

    componentWillReceiveProps(){
        if(this.props.disabled === 'true'){
            //document.getElementById('dropdownButton').disabled = true;
            //this.refs.dropdownButton.disabled = true
            console.log('button disabled......................');
        }
        else{
            console.log('no disabled props');
        }
    }*/

    onDropDownClick = () => {
        //console.log('button is clickable-----');
        if(this.state.openList === false){
            this.setState({
                displayMenuItems: true,
                openList: true,
            })
        }
        else{
            this.setState({
                displayMenuItems: false,
                openList: false,
            })
        }

    }

    /*onMenuItemSelect = (selectedMenuItem) => {
        console.log('1111111111111', selectedMenuItem);
        /!*this.setState({
            selectedListItem:selectedMenuItem
        },() => {
            this.setState({
                displayMenuItems: false,
                openList: false,
            })
            this.props.selectedValue(this.state.selectedListItem);
        })*!/
    };*/

    render(){
        let dataArray = this.props.data;
        /*let selectobject = this.props;
        let array =[];
        for (let i in selectobject) {
            array = selectobject[i];
            console.log('obj!!!!!!----------',array);
        }*/
        return(
            <div>
                <DropdownButton title={this.props.title}>
                   {dataArray.map((item, index) => {
                        return (<MenuItem key={index} eventKey={index+1} onSelect={() => this.props.onSelect(item)}>{item}
                        </MenuItem>)

                    })}
                </DropdownButton>

                {/*{
                    this.state.openList === true?
                        <div className="main-dropdown">
                            <button
                                onClick={this.onDropDownClick.bind(this)}
                                id="dropdownButton"
                                disabled={this.state.buttonDisabled}
                                className="drop-button" value={this.state.selectedItem}>{this.state.selectedListItem}
                                <span className="glyphicon glyphicon-chevron-down"></span></button>
                            {dataArray.map(item => {
                                    return (<MenuItemList option={item} onMenuItemSelect={this.onMenuItemSelect}/>)
                            }
                            )}
                        </div>:
                        <div className="main-dropdown">
                            <button onClick={this.onDropDownClick.bind(this)}
                                    disabled={this.state.buttonDisabled}
                                    className="drop-button">{this.state.selectedListItem}
                                <span className="glyphicon glyphicon-chevron-down"></span></button>
                        </div>
                }*/}
            </div>
        )
    }
}

export default LogDropdown;


