// set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8000;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

/*app.get('/', function(req, res){
    res.sendFile(__dirname +'/public/index.html');
});*/

// configuration
mongoose.connect(database.localUrl);

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));


// routes
require('./app/routes.js')(app);

// listen
app.listen(port);
console.log("App listening on port " + port);
