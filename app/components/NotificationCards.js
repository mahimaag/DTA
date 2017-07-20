import React, { Component } from 'react';
import { Link } from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import LogNotificationCard from './LogNotificationCard';
import '../../public/styles/card-styling.css';
/*const Card = (props)=>{
 return (
 <div className="card" ...this.props>
 {this.props.children}
 </div>
 );
 };*/

/*
const LogCard = ({dueDate,month,missingLog,partialLog}) => {
  return(
    <div className="card">
      <div className="card-header">
        <h3>Fill in your timesheet by <b>{dueDate+" "+month}</b></h3>
      </div>
      <div className="card-block">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="col-md-6">
            <div>
              {missingLog + " Days"}
            </div>
            <div>Missing log</div>
          </div>
          <div >
            <div>
              {partialLog + " Days"}
            </div>
            <div>Partial log</div>
          </div>
        </div>
      </div>
    </div>
  );
};
*/

class ActivityLog extends Component{
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
      <div className="card">
        <div className="card-header">
          <h5 className="">ACTIVITY({this.state.activityCount})</h5>
          {!this.state.activityCount?'':<h5 className="">viewall</h5>}
        </div>
        <div className="card-block">
          <div className="activity-list">
            {activityList}
          </div>
        </div>
      </div>
    );
  }
}

const ProjectLog=(props)=>{
  let projectList = [];
  props.projectList.forEach((data, index)=>{
    projectList.push(<div>{data.projectName} - Approval:{data.approval}</div>)
  })
  return(
    <div className="card">
      <div className="card-header">
        <h3>You have been assigned to <b>{props.numProjects}</b> project(s)</h3>
      </div>
      <div className="card-block">
        <div className="project-list">
          {projectList}
        </div>
      </div>
    </div>
  );
};

class NotificationCards extends Component{
  render(){
    return(
      <div className="left-panel">
        <LogNotificationCard dueDate="24" month="Jul" missingLog="10" partialLog="3"/>
        <br/>
        <ActivityLog activityCount="2"/>
        <br/>
        <ProjectLog numProjects="2"/>
      </div>
    );
  }
}

ActivityLog.defaultProps = {
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

ProjectLog.defaultProps = {
  projectList:[{projectName: "Project one", approval:"User one"},{projectName:"Project two", approval:"User one"}]
};

export default NotificationCards;

/*
 <div className="card">
 <div className="card-header">
 Featured
 </div>
 <div className="card-block">
 <h4 className="card-title">Special title treatment</h4>
 <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
 </div>
 </div>
 */

//<LogCard dueDate="27" month="July" missingLog="10" partialLog="3"/>