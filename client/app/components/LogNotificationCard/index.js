import React, { Component } from 'react';

import {Card, CardHeader, CardContent, CardFooter} from './../../Core/Card';

const month=["JAN","FEB","MARCH","APR","MAY","JUNE","JULY","AUG","SEPT","OCT","NOV","DEC"];
class LogNotificationCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Card>
                <CardHeader>
                    <span>Total hrs logged in {month[this.props.month]} <h2> {this.props.totalHours}</h2></span>
                </CardHeader>
                <CardContent>
                    <div className="col-md-12 col-lg-12 col-sm-12 clearfix">
                        <div className="col-md-6">
                            <span>{this.props.missingLog}Days</span>
                            <span>NO LOG</span>
                        </div>
                        <div className="col-md-6">
                            <span>{this.props.partialLog}Days</span>
                            <span>PARTIAL LOG</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter/>
            </Card>
        );
    }
}

export default LogNotificationCard;
