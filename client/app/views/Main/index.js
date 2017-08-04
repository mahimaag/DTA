import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from '../LandingPage';
import Progress from 'core/Progress';
import Navigation from 'core/Navigation';
import Footer from 'core/Footer';
import TopHeader from 'core/TopHeader';
import Sample from  'components/Sample';

class Main extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let wrapperClass = "gray-bg ";
        // return (
        //     <h1>
        //         Hello world
        //     </h1>
        // );
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
