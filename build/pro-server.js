var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')//session 
var config = require('../config');
var debug = require('debug')('app:server');

var port = config.build.port;

var routes = require('../routes/index');

app.use(session({
  secret: '732872784s',
  name: 'qcscustomertest',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 1000*60*60*60*3 },  //设置maxAge是60000ms，即3小时后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(express.static(config.build.assetsRoot));


var port = config.build.port;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
// server.on('error', onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}