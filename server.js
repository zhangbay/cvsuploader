var express = require('express');
var app =express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var db = require('./config/db');
var morgan = require('morgan');
// config files

var port = process.env.PORT || 4444;
mongoose.connect(db.url);
//get all data/stuff of the body (POST) parameters
//parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({  type: 'application/vd.api+json'  }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({  extended: true  }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public' ));

app.use(morgan('dev'));
// routes ==================================================
require('./app/routes')(app);
// start app ===============================================
// startup our app at http://localhost:4444
app.listen(port);

// shoutout to the user
console.log('Server on port ' + port);

// expose app
module.exports = app;