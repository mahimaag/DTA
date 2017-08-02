import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';

import {Card, CardHeader, CardContent, CardFooter} from './../../Core/Card';

class LogActivityCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            activityCount: 0,
            activityList: []
        };
        this.okHandler = this.okHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
    }

    okHandler(e, index){
        let activityList = [];
        //update database
        // enter code here
        //

        //next remove data
        this.state.activityList.forEach(function (data, i) {
            if(i!=index){
                activityList.push({...data})
            }
        });
        this.setState({
            activityList: activityList
        });
    }
    removeHandler(e, index){
        let activityList = [];
        //update database
        //next remove data
        this.state.activityList.forEach(function (data, i) {
            if(i!=index){
                activityList.push({...data})
            }
        });
        this.setState({
            activityList: activityList
        });
    }
    componentWillMount(){
        let activityList = [];
        let max = this.props.activityList.length>2?2:this.props.activityList.length;
        for(let i=0; i<max; i++){
            activityList.push(this.props.activityList[i]);
        }
        this.setState({
            activityCount: this.props.activityCount || 0,
            activityList: activityList
        });
    }
    render(){
        let activityList = [];
        this.state.activityList.map((data, index)=>{
            activityList.push(
                <div key={index} className="activity">
                    <div className="col-sm-12 col-md-12 col-lg-12 description">
                        <button className="btn btn-circle"></button>
                        <span>{data.description}</span>
                        <span> time ago </span>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="col-sm-6 col-md-6 col-lg-6">2 hours</div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <button type="button" className="btn btn-default btn-sm" onClick={(e)=>this.okHandler(e,index)}>
                                <Glyphicon glyph="ok-circle"></Glyphicon>
                            </button>
                            <button type="button" className="btn btn-default btn-sm" onClick={(e)=>this.removeHandler(e,index)}>
                                <Glyphicon glyph="remove-circle"></Glyphicon>
                            </button>
                        </div>
                    </div>
                </div>);
        });
        return(
            <Card>
                <CardHeader>
                    <h5 className="">ACTIVITY({this.state.activityCount})</h5>
                    {!this.state.activityCount?'':<h5 className="">viewall</h5>}
                </CardHeader>
                <CardContent>
                    <div className="activity-list">
                        {activityList}
                    </div>
                </CardContent>
                <CardFooter/>
            </Card>
        );
    }
}

LogActivityCard.defaultProps = {
    activityCount:2,
    activityList: [{
        description: "D1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum quam ligula, in lobortis lacus rutrum sit amet. Cras fringilla mauris diam, ac hendrerit elit vestibulum a. Sed ornare egestas nibh tincidunt mollis."
    },{
        description: "D2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum quam ligula, in lobortis lacus rutrum sit amet. Cras fringilla mauris diam, ac hendrerit elit vestibulum a. Sed ornare egestas nibh tincidunt mollis."
    },{
        description: "D3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum quam ligula, in lobortis lacus rutrum sit amet. Cras fringilla mauris diam, ac hendrerit elit vestibulum a. Sed ornare egestas nibh tincidunt mollis."
    },{
        description: "D4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum quam ligula, in lobortis lacus rutrum sit amet. Cras fringilla mauris diam, ac hendrerit elit vestibulum a. Sed ornare egestas nibh tincidunt mollis."
    }]
};

export default LogActivityCard;
