var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var spenditures = require('./routes/spenditures');

var db = require('./models/db');
var app = express();

app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

// Setup Sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db.connection }),
  cookie: { secure: false }
};

//if (process.env.NODE_ENV === 'production') {
//  app.set('trust proxy', 1); // trust first proxy
//  sess.cookie.secure = true; // serve secure cookies
//}

app.use(session(sess));

db.connection.once('open', function() {
  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

});

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static(__dirname +'/dist'));
app.use('/api/user', users);
app.use('/api/spenditure', spenditures);

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
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
