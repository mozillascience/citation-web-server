var express    = require('express');        // call express
var path    = require( 'path' );
var app = require('../app');

var port    = process.env.PORT || 3000;

console.log("Port 1:: " + port);
app.set('port', port);

/**
 * Start App after sequelize sync.
 *
 * @return {undefined}
 */
var server = app
  .listen(
    app.get('port'), function() {
      console.log("Port 2:: " + server.address().port);
    }
  );
