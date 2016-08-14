var express = require('express');
var router = express.Router();
var userdao = require("../dao/UserDao.js");
var res_util = require("../util/res_util.js")

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
    next();
});

//添加用户
router.post('/adduser.html',function(req,res,next){
    var user_id = req.body.userId;
    var name = req.body.username;
    var password = req.body.password;
    var age = Number(req.body.age);
    var address = req.body.address;
    var des = req.body.description;
    var user = {_id:user_id,name:name,password:password,age:age,address:address,description:des};
    userdao.userInsert(user,function(err){
        if(err){
            res.json(JSON.stringify({message:'error'}));
        }
        res.json(JSON.stringify({message:'success'}));
    });
});

//查询用户
router.get('/finduser.html',function(req,res,next){
    var user_id = req.query.userId;
    userdao.findUserById(user_id,function(error,result){
        if(error){
            res_util.res_error(res,500,"服务器错误");
        }else{
            var out;
            if(!result){
                out = {user:null};
            }else{
                out = {user:result};
            }
            res.json(JSON.stringify(out));
        }
    });
});

//通过用户名查询用户
router.get('/finduserbyname.html',function(req,res,next){
    var name = req.query.username;
    userdao.findUserByName(name,function(error,results){
        if(error){
            res_util.res_error(res,500,"服务器错误");
        }else{
            console.log(results);
            res.render("userlist",{users:results});
        }
    });
});

//通过用户名 和 年龄共同查询
router.get('/:name/:age.html',function(req,res,next){
    var name = req.params.name;
    var age = Number(req.params.age);

    var params = {$and:[{name:name},{age:age}]};

    console.log(params);
    userdao.findUsers({name:name,age:age},function(error,results){
        if(error){
            res_util.res_error(res,500,"服务器错误");
        }else{
            console.log(results);
            res.render("userlist",{users:results});
        }
    });
    next();
});

//通过年龄区间查询
router.get('/age/:low/:high.html', function (req,res,next) {
    var low = Number(req.params.low);
    var high = Number(req.params.high);
    userdao.findUsersByAgeRange(low,high,function(error,results){
        if(error){
            res_util.res_error(res,500,"服务器错误");
        }else{
            res.render("userlist",{users:results});
        }
    });
});

/*跳转到用户查询页*/
router.get('/userinfo.html',function(req,res){
    res.render("divide_page");
});



router.get('/v1/all/firstpage.html',function(req,res,next){
    var cur_page = Number(req.query.currentPage);
    var page_size = Number(req.query.pageSize);
    var skip_size = (cur_page - 1) * page_size;
    userdao.findUserDividePage(skip_size,page_size,function(error,results){
        if(error){
            res_util.res_error(res,500,"服务器错误");
        }
        userdao.getUsersCount(function(error,recordsCount) {

            if(error){
                res_util.res_error(res,500,"服务器错误");
            }
            var out = {
                recordCounts: recordsCount,
                users: results
            };
            console.log(out);
            res.json(JSON.stringify(out));
        });
    });
});


router.get('/v1/dividpage/finduser.html',function(req,res,next){
    var cur_page = Number(req.query.currentPage);
    var page_size = Number(req.query.pageSize);
    var skip_size = (cur_page - 1) * page_size;
    userdao.findUserDividePage(skip_size,page_size,function(error,results){
        if(error){
            res_util.res_error(res,500,"服务器错误");
        }
        var out = {
            users:results
        };
        res.json(JSON.stringify(out));
    });

});

router.post('/update/userinfo.html',function(req,res){
    var userId = req.body._id;
    var user = req.body;
    delete user._id;
    user.age = Number(user.age);
    userdao.updateUserInfo(userId,user, function (error) {
        if(error){
            res_util.res_error(res,500,"服务器错误");
        }
        user._id = userId;
        res.render("userinfo",{user:user});
    });
});

router.post("/delete/user.html",function(req,res,next){
    var userId = req.body.userId;
    userdao.deleteUserInfo(userId,function(error){
        if(error){
            res_util.res_error(res,500,"服务器错误");
        }
        res.render("index");
    });
});

router.get("/login.html",function(req,res){
    var userId = req.query.userId;
    var password = req.query.password;
    userdao.findUserById(userId,function(error,result){
        var out = {result:"fail"};
        if(error){
            out.message = "服务器异常";
            res.render("login",out);
        }else{
            if(!result){
                out.message = "用户名有误";
                res.render("login",out);
            }else if(result.password != password){
                out.message="密码有误";
                res.render("login",out);
            }else{
                res.render("main");
            }
        }
    });
});


module.exports = router;
