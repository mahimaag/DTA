import React, { Component } from 'react';

import {Card, CardHeader, CardContent, CardFooter} from './../../Core/Card';

class LogNotificationCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Card>
                <CardHeader>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. {this.props.dueDate + ' '+ this.props.month}</h4>
                </CardHeader>
                <CardContent>
                    <div className="col-md-12 col-lg-12 col-sm-12 clearfix">
                        <div className="col-md-6">
                            {this.props.missingLog} -  missing logs
                        </div>
                        <div className="col-md-6">
                            {this.props.partialLog} - partial logs
                        </div>
                    </div>
                </CardContent>
                <CardFooter/>
            </Card>
        );
    }
}

export default LogNotificationCard;
