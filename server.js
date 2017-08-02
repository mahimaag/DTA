var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var path = require("path");
// import app from './server/index';
// import logger from './server/components/logger';
// import appConfig from './server/config/environment';

var compiler = webpack(webpackConfig);


let onBuildError = (err) => { 
    console.log('Error while building the project', err);
    process.exit(1);
    return;
}

compiler.run(function(err, stats) {
    console.log('Compiled successfully', stats.toString({ colors: true}));
    if(err){ return onBuildError(err); }

    // return startServer(stats);
});

// Start server
// const startServer = (buildStats) => {
//   logger.debug('We are all set for starting the server.');  
//   const server = app.listen(appCon fig.port, appConfig.ip, () => {
//     logger.info('Express server listening on %d, in %s mode', appConfig.port, app.get('env'));
//   });
// }

compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, (err, stats) => {
    if(err){ return onBuildError(err); }
    console.log('RE-Compiled successfully', stats.toString({ colors: true}));
    // return startServer(stats);
});

// new WebpackDevServer(webpack(config), {
//     publicPath: config.output.publicPath,
//     hot: true,
//     historyApiFallback: true,
//     contentBase: "assests/"
// }).listen(8000, 'localhost', function (error) {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Server running at http://localhost:8000/');
//     });
