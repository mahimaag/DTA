import React from 'react';

class CalendarNavigation extends React.Component{
    constructor(props){
        super(props);
        console.log("=====constructor is called=========")
    }

    backClick = () => {
        console.log("state in back is:",this.props);
        this.props.previousEvents();

    };
    nextClick = () => {
        console.log("state in back is:",this.props);
        this.props.nextEvents();

    };
    todayClick = () => {
        console.log("today clicked");
        this.props.todayEvents();
    };
    render(){
        return(
            <div>
                {
                    this.props.month === new Date().getMonth() && this.props.title === 'next'?
                        <button disabled={true}>{`>`}</button>:
                    this.props.title === 'next' ?
                        <button onClick={this.nextClick}>{`>`}</button>  :
                        <div>
                            {this.props.title === 'back' ?
                                <button onClick={this.backClick}>{`<`}</button> :
                                <button onClick={this.todayClick}>today</button>
                            }
                        </div>
                }
            </div>
        )
    }
};

export default CalendarNavigation;

