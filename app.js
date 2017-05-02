

const express = require('express');        // call express
const bodyParser = require('body-parser');

const app = express();                 // define our app using express


// Import configuration variables
const path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REGISTER OUR ROUTES -------------------------------
// all of our version 01 routes will be prefixed with /v01
app.use('/v01', require('./routes/v01'));

// static file serve
app.use(express.static(path.join(__dirname, '/public/')));

// This sends the Index for everything else....
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send(`Error [DEV] ${err}`);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500).send('Error [PROD]');
});

module.exports = app;
