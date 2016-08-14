var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./dao/dbutil.js');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//���ÿ������
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  next();
});

// view engine setup
//����ģ���ļ�·��
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(express.static(path.join(__dirname, '/public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //�ڿ���̨�����־��Ϣ
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.method-override)

app.use('/', routes);
app.use('/users', users);


//�ļ��ς�
app.use(function(req,res){
  if(!req.files){
    res.end("Did you send a file");
  }else {
    console.log(req.files);
    res.end("files upload");
  }
});




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

//Ĭ�J�O 3000�˿�
//app.listen(8080);

//��Ҫ�_��db.init�����ڑ��Æ���ǰ���{��
db.init(function (error,result){
  if(error){
    console.log("false error on start");
    console.log(error);
    process.exit(-1);
  }
  app.listen(8080);
});

module.exports = app;
