'use strict'; /* @flow weak */

/**
* Setups bunyan loggers
*/

const bunyan = require('bunyan');
const plugins = require('restify-plugins');
const restify = require('restify');

var setupLoggers = function (server) {

  const logger = bunyan.createLogger({
    name: 'csv-uploader-logger',
    stream: process.stdout
  });

  // some uncaughtExc, log it.
  server.on('uncaughtException', (req, res, route, err) => {
    logger.fatal(err);
  });

  // internal server error, simply log it and not crash the service
  // triggered by new restify.errors.InternalServerError -> next(e);
  server.on('InternalServer', (req, res, err, cb) => {
    logger.fatal(err);
    return cb();
  });

  //basic per request logger
  server.on('after', plugins.auditLogger({
    log: logger
  }));

  // make globally accessible
  server.log = logger;

};

module.exports = setupLoggers;

