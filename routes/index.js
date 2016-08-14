var express = require('express');
var router = express.Router();
var qs = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main');
});

router.get('/albums/first/detail.html', function (req, res, next) {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  var data = {"user1":"小明","user2":"小红"};
  res.render('index',{"user1":"小明","user2":"小红"});
});

router.post('/albums/first/detail2.html', function (req,res,next) {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  res.render('index',{"message":"success"});
});


router.get('/index/get/test.html',function(req,res){
  console.log(req.query);
  res.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin' : '*' });
  res.write(JSON.stringify({"message":"success"}));
  res.end();
});

router.post('/index/post/test.html',function(req,res,next){
  console.log(req.body);
  res.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin' : '*' });
  res.json({message:"success"});
});

router.get('/index/v1/welcome.html',function(req,res){
  res.render('welcome');
});

router.get('/register.html' , function(req,res){
  res.render('register');
});
router.get('/login.html',function(req,res){
  res.render('login',{message:''});
});

module.exports = router;
