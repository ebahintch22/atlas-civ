require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var preloadRouter = require('./routes/app-loader');

var buyerRouter = require('./routes/buyers');
var visitorRouter = require('./routes/visitors');
var covidRouter = require('./routes/covid');

//Payroll Models
var employeeRouter = require('./routes/employees');





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


app.use('/sante', preloadRouter);
app.use('/economie-6e448f82-644e-4c4f-8f53-1bcd3a70ea49', preloadRouter);
app.use('/admin-civ-123', preloadRouter);
app.use('/xprience', preloadRouter);
app.use('/', indexRouter);

app.use('/users', usersRouter);
//app.use('/socket', socketRouter);//socketRouter

app.use('/visitors', visitorRouter);//socketRouter
app.use('/guest-acf/visitors', visitorRouter);//socketRouter
app.use('/civ/visitors', visitorRouter);//socketRouter
app.use('/guest-gtx/visitors', visitorRouter);//socketRouter

app.use('/covid', covidRouter);//socketRouter
app.use('/buyers'  , buyerRouter);

app.use('/payroll/employees'  , employeeRouter );

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
