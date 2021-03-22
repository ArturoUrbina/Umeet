var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var formidable = require("express-form-data");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session');

var app = express();

app.use(formidable.parse({ keepExtensions: true, uploadDir:"./public/img" }));

app.use(session({
  resave:false,
  saveUninitialized: true,
  secret: "EYEMeetU2019"
}));

app.set('port', process.env.PORT||3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));



app.listen(app.get('port'), ()=>{
  console.log('Servidor en el puerto: ', app.get('port'));
});