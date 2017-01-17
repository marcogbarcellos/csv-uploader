'use strict';

/*
* Routes register
*/
var upload = require('../lib/upload');

module.exports = function (server) {

  // uploads API
  server.post({ name: 'upload', path: '/upload' }, upload.upload);
};

