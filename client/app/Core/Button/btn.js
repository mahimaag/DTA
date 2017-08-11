import React from 'react';
import _ from 'lodash';

const BtnLevelTypes = [
    { name: 'primary', _class: 'btn-primary'},
    { name: 'secondary', _class: 'btn-secondary'},
    { name: 'warn', _class: 'btn-warn'},
    { name: 'alert', _class: 'btn-alert'}

];

const FrequentButtons = [
    { name: 'Approve' , _icon: 'fa fa-check', title: 'Approve', rounded: true, primary: true, _class: BtnLevelTypes.find(b => b.name === 'primary')._class, loading: true},
    { name: 'Decline' , _icon: 'fa fa-close', rounded: true, primary: true, _class: BtnLevelTypes.find(b => b.name === 'secondary')._class, loading: true },
    { name: 'Add' ,     _icon: 'fa fa-plus',  title: 'Add',     rounded: true, primary: true, _class: BtnLevelTypes.find(b => b.name === 'warn')._class, loading: true},
    { name: 'Delete' ,  _icon: 'fa fa-trash',                   rounded: true, primary: true, _class: BtnLevelTypes.find(b => b.name === 'alert')._class, loading: true}
];

const _noop = () => console.log;

const getBtnLevelClass = (btnLevel) => {
    const btnType = BtnLevelTypes.find(btn => btn.name == btnLevel);
    const btnTypeClass = btnType ? btnType._class: '';
    return btnTypeClass;
}

/**
|--------------------------------------------------
| Generalized and Specialized set of buttons for Ttn.
| Single point of contact for all types of button in ttn.
|--------------------------------------------------
*/
export default class TtnButton extends React.Component {
    // 
    isIconButton = () => {
        const isFrequentButton = FrequentButtons.find( btn => btn.name == this.props.nature);
        return !!( isFrequentButton || this.props.iconButton);
    }

    render() {
        // Treat icon buttons as specialized case.
        const buttonComponent = this.isIconButton() ? (<TtnIconButton {...this.props }/>): (<TtnFlatButton { ...this.props} />) ;
        // console.log('Component --> ', buttonComponent);
        return buttonComponent;        
    }
}


class TtnFlatButton extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            loading: false
        }
    }

    render() {
        const _btnClass = `ladda-button ladda-button-demo btn ${getBtnLevelClass(this.props.level)} ${this.props.rounded? 'btn-rounded': ''}`;
        return (
            <button className={_btnClass}
                    onClick={ this.props.onClick || _noop}
                data-style="zoom-in">
                { this.props.title }
            </button> 
        )
    }
}

/**
|--------------------------------------------------
| Icon buttons.
|--------------------------------------------------
*/
class TtnIconButton extends React.Component{

    getFrequentBtn = () => {
        if(!this.props.nature){ return {}; }
        const frequentBtn = FrequentButtons.find( btn => btn.name == this.props.nature);
        return frequentBtn ? frequentBtn : {};
    }

    render() {
        const _frequentBtn = this.getFrequentBtn();
        const _iconClass = this.props.icon || _frequentBtn._icon;
        const _title = this.props.title || _frequentBtn.title;
        const _btnLevelClass = getBtnLevelClass(this.props.level) || _frequentBtn._class;
        const _btnRoundClass = this.props.rounded ||_frequentBtn.rounded ? 'btn-rounded': '';
        const _btnClass = `ladda-button ladda-button-demo btn btn-circle ${_btnLevelClass} ${_btnRoundClass}`;
        return (
            <button className={_btnClass}
                    onClick={ this.props.onClick || _noop }
                    data-style="zoom-in">
                <i className={_iconClass} aria-hidden={true} ></i> 
                { _title }
            </button>
        );
    }
}
