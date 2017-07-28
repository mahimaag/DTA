import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from '../LandingPage';
import Progress from './../../Core/Progress';
import Navigation from './../../Core/Navigation';
import Footer from './../../Core/Footer';
import TopHeader from './../../Core/TopHeader';
import Sample from  './../../components/Sample';

class Main extends Component {
    constructor(props){
        super(props);
        console.log('jksdhjhjbhj')
    }

    render() {
        let wrapperClass = "gray-bg ";
        return (
            <div id="wrapper">
                <Progress />
                <Navigation location={this.props.location}/>

                <div id="page-wrapper" className={wrapperClass}>

                    <TopHeader />

                    <Switch>
                        <Route exact path="/" component={Landing}></Route>
                        <Route path="/main" component={Landing}> </Route>
                    </Switch>

                    <Footer />

                </div>

            </div>
        )
    }

}

export default Main
