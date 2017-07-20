import React from 'react'
import Main from '../views/Landing';
import Blank from '../components/layouts/Blank';

import MainView from '../views/Main';
import MinorView from '../views/Minor';

//import { Route, Router, IndexRedirect, browserHistory} from 'react-router';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
export default (
    <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route path="/main" component={MainView}> </Route>
        <Route path="/minor" component={MinorView}> </Route>
    </Switch>

);