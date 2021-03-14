const express = require('express'),
      exphbs = require('express-handlebars'),
      fs = require('fs'),
      path = require('path'),
      favicon = require('serve-favicon'),
      morgan = require('morgan'),
      cookieParser = require('cookie-parser'),
      Handlebars = require('handlebars'),
      { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access'),

      port = process.env.PORT || 3000,
      config = require('./lib/configLoader'),    
      db = require('./lib/database'),

      routes = require('./routes/index'),
      app = express();

// view engine setup
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'masterLayout',
    // https://www.npmjs.com/package/@handlebars/allow-prototype-access
    // Need to add due to security change in Handlebars 4.6+
    handlebars:  allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Pass database config settings
db.init(config.databaseConfig);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});


//*********************************************************
//    Quick and dirty way to detect event loop blocking
//*********************************************************
let lastLoop = Date.now();

function monitorEventLoop() {
    const time = Date.now();
    if (time - lastLoop > 1000) console.error('Event loop blocked ' + (time - lastLoop));
    lastLoop = time;
    setTimeout(monitorEventLoop, 200);
}

if (process.env.NODE_ENV === 'development') {
    monitorEventLoop();
}



module.exports = app;
