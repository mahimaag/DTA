import React from 'react';
import Progress from '../components/common/Progress';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import TopHeader from '../components/common/TopHeader';
import { correctHeight, detectBody } from '../components/layouts/Helpers';
import { Route, Switch } from 'react-router-dom';
import MainView from './Main';
import MinorView from './Minor';
class Main extends React.Component {

    render() {
        let wrapperClass = "gray-bg ";
        return (
            <div id="wrapper">
                <Progress />
                <Navigation location={this.props.location}/>

                <div id="page-wrapper" className={wrapperClass}>

                    <TopHeader />

                    <Switch>
                        <Route exact path="/" component={MainView}></Route>
                        <Route path="/main" component={MainView}> </Route>
                        <Route path="/minor" component={MinorView}> </Route>
                    </Switch>

                    <Footer />

                </div>

            </div>

        )
    }

    componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
         setTimeout(() => {
         correctHeight();
         }, 300)
         });
    }
}

export default Main