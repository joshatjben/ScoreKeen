
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , sass = require('stylus');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  this.use(require("stylus").middleware({
      src: __dirname + "/public",
      compress: true
  }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(__dirname + '/public', { maxAge: 0 }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.use(express.static(__dirname + '/public'));
});

// Routes

app.get('/', routes.index);

app.listen( process.env.C9_PORT || process.env.PORT || 3000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
