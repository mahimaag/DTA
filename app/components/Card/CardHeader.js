import React, { Component } from 'react';

class CardHeader extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="card-header">
        {this.props.children}
      </div>
    );
  }
}

export default CardHeader;