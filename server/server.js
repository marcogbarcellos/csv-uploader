'use strict'; 

const restify = require('restify');
const plugins = require('restify-plugins');

restify.errors = require('restify-errors');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const host = config.HOST;
const port = config.PORT;

const server = restify.createServer({
  name: 'csv-uploader'
});

// make configs globaly availabe
server.config = config;

// default http helpers/handlers
server.use(plugins.queryParser());
server.use(plugins.jsonBodyParser({
  mapParams: true
}));

server.use(
  (req,res,next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

// --> logging
require('./log')(server);

// --> routes
require('./routes/index')(server);

// --> db
require('./models/index');

// --> starting
server.listen(port, host, () => {
  server.log.info(server.name + ' running: ' + host + ':' + port);
});

// expose for testing
module.exports = server;

