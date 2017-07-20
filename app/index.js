import React from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routes';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './views/Landing';

import jquery from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './../public/styles/style.css'

ReactDOM.render(
<Router><Landing/></Router>,
    document.getElementById('root')
);