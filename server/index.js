'use strict';

// Set default node environment to development
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test') {
  // Register the Babel require hook
  require('babel-register');
}
let app =require('./app');
const startServer = (buildStats) => {
    const server = app.listen(3000, 'localhost', () => {
    console.log('Express server listening on in mode');
  });
};

startServer();
// Export the application
 module.exports = require('./app');
