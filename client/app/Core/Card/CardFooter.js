import React, { Component } from 'react';

class CardFooter extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="card-footer" style={this.props.style}></div>
    );
  }
}

export default CardFooter;