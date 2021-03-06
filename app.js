
/**
 * Module dependencies.
 */

var express = require('express')
  , passport = require('passport')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: "32b919d18cfaca89383f6000dcc9c031_YAY" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require("stylus").middleware({
  src: __dirname + "/public",
  compress: true
}));
app.use(express.static(__dirname + '/public'));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(__dirname + '/public', { maxAge: 0 }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.use(express.static(__dirname + '/public'));
});

//Index
app.get('/', routes.index.landing);

//Login
app.get('/login', routes.login.landing);

//Register
app.get('/register', routes.register.landing);

//Manage
app.get('/manage', routes.manage.landing);

console.log(routes);

// Start Listenting
app.listen(process.env.PORT || process.env.C9_PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);