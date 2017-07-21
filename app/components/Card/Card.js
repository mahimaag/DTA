import React, { Component } from 'react';

import CardHeader from './CardHeader';
import CardContent from './CardContent';
import CardFooter from './CardFooter';

class Card extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="card" style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Card;