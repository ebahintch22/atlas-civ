require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//var socketRouter = require('./socket/api-socket');
var buyerRouter = require('./routes/buyers');
var visitorRouter = require('./routes/visitors');

if (!global.OPERA_DATA_BUS) { global.OPERA_DATA_BUS = []}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

app.use('/users', usersRouter);
//app.use('/socket', socketRouter);//socketRouter

app.use('/visitors', visitorRouter);//socketRouter
app.use('/guest-acf/visitors', visitorRouter);//socketRouter


app.use('/buyers'  , buyerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
