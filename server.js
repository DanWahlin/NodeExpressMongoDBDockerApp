import express from 'express';
import exphbs from 'express-handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import config from './lib/configLoader.js';
import db from './lib/database.js';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

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
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port, (err) => {
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

export default app;
