const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
        client:redis.createClient(6379,'127.0.0.1'),
        ttl: 60 * 60 * 6
    }),
    secret: 'express is powerful'
}));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/static',require('./routes/static'))
app.all('/api*',function (req,res,next) {
    console.log(req.url,'---url--')
    console.log(req.query,'--query---')
    if (req.query && req.query.app_id === '0bc62249720f1d7395f984ba649b0e46' ) {
        next();
    } else {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end('请输入正确的app_id')
    }

})
app.use('/api/v1',require('./routes/api/v1'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
