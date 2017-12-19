var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var auth = require('./bin/auth')
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');

var connectionString = auth.mongooseUrl;
mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('todo db connected');
});


var index = require('./routes/index');
var users = require('./routes/users');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
  res.header("access-control-allow-methods", "GET, POST, PUT");
  res.header("server", "cloudflare-nginx");
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/todo', index);
app.use('/api/users', users);

module.exports = app;
