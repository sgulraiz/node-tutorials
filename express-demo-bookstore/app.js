//load config module
const config = require ('config');
//load debud module
const debug = require('debug')('app:startup');
//load morgan for logging
const morgan = require('morgan');
//load express module
const express = require('express');
const app = express();
//load the categories module
const categories = require('./routes/categories');


//Use the express middleware to parse request body and convert to JSON
app.use(express.json());
//route traffic to categories
app.use('/api/categories', categories);
//load Joi module for schema validation
const Joi = require('joi');
//load logger custom middleware
const logger = require('./logger');
//display the application environment
console.log(`app env: ${app.get('env')}`);
//display environment configuration information
console.log('App Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Server Password: ' + config.get('mail.password'));
//use morgan in the development environment
if (app.get('env') === 'development') {
    //use morgan for logging
    //we are using tiny format but other formats are available - see documentation
    app.use(morgan('tiny'));
    debug('Morgan Enabled...')
}
//call logger custom middleware function
app.use(logger);

//define the the port constant and assign the environment avariable - or listen to 3000 if environment variable is not found
const port = process.env.PORT || 3000
//Start the webserver to listen on the defined port
app.listen(port, () => console.log(`Listening on port ${port}...`));