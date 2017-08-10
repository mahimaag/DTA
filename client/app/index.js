import React, {Component} from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './views/Main';


import jquery from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap';

import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../../node_modules/font-awesome/css/font-awesome.css'
import './../../node_modules/animate.css/animate.min.css'
import './../assests/styles/style.css'

export default class App extends Component {
    render() {
        return (
            <Router>
                <Main />
            </Router>
        );
    }
}

/*ReactDOM.render(
    <Router><Main/></Router>
,    document.getElementById('root')
);*/

/*
  </AppContainer>,

if (module.hot) {
  module.hot.accept('./views/Main', () => {
    console.log("changes.....");
    const NextApp = require('./views/Main').default;
    ReactDOM.render(
      <AppContainer>
          <Router><NextApp/></Router>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
*/
