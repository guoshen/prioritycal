'use strict';
var favicon = require('static-favicon');
var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var logger = require('morgan');


var session= require('express-session');
var passport= require('passport');
var os = require("os");

var config= require('./config');


var morgan = require('morgan');

// Custom routes
var index = require('./routes/index');
var users = require('./routes/users');
var auth= require('./routes/auth');

// Server setup
var app = express();
var server = http.createServer(app);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({secret:'temp'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', index);
app.use('/users', users)
app.use('/auth', auth);


var googleStrategy= require('passport-google-oauth').OAuth2Strategy;
//identify application
passport.use(new googleStrategy({
    clientID: '996153089905-1i15mtvivr9rm1oeb7u77f0501r43pnc.apps.googleusercontent.com',
    clientSecret: 'ZlCiw72f0FuY5lQkye1GfeLJ',
    callbackURL: 'http://localhost:3000/auth/google/callback'},
    function(req, accessToken, refreshToken, profile, done){
        //user profile from google attached to session
        done(null, profile);
    })
);




passport.serializeUser(function(user, done){
  //put entire user obj into session for now
  done(null, user);
});
passport.deserializeUser(function(user,done){
  done(null, user);
});




// Catch 404 errors
// Forwarded to the error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
// Displays stacktrace to the user
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// Does not display stacktrace to the user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: ''
  });
});

server.listen(process.env.PORT || 3000);
console.log(process.env.PORT);
console.log(os.hostname());


module.exports = app;


