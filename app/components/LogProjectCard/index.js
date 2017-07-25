import React, { Component } from 'react';

import {Card, CardHeader, CardContent, CardFooter} from './../../Core/Card';

const LogProjectCard =(props)=>{
    let projectList = [];
    props.projectList.forEach((data, index)=>{
        projectList.push(<div key={index}>{data.projectName} - Approval:{data.approval}</div>)
    });
    return(
        <Card>
            <CardHeader>
                <h3>You have been assigned to <b>{props.numProjects}</b> project(s)</h3>
            </CardHeader>
            <CardContent>
                <div className="project-list">
                    {projectList}
                </div>
            </CardContent>
            <CardFooter/>
        </Card>
    );
};

LogProjectCard.defaultProps = {
    projectList:[{projectName: "Project one", approval:"User one"},{projectName:"Project two", approval:"User one"}]
};

export default LogProjectCard;
