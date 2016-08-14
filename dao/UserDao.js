var dbutil = require("./dbutil.js");


var user1 = {
        name:'jack',
        age:12,
        address:'北京',
        description:'i am a student'
}

//safe:true 确保数据写入成功
exports.userInsert = function(user,callback){
    dbutil.users.insert(user,{safe:true},function(error,inserted_doc){
        console.log("inserted_doc" + inserted_doc);
        if(error && error.name == "MongoError" && error.code==11000){ //_id已存在
            console.log("this album exists already");
            callback(error);
            return;
        }else if(error){
            console.log("something bad happened");
            callback(error);
            return;
        }
        callback(null);
    });
}



exports.findUserById = function(userId,callback){

    dbutil.users.find({_id:userId}).toArray(function(error,results){
        if(error){
            callback(error);
            return;
        }
        if(results == null){
            callback(null,null);
            return;
        }
        callback(null,results[0]);
    });
}

exports.findUserByName = function(username,callback){
    dbutil.users.find({name:username}).toArray(function(error,results){
        if(error){
            callback(error);
            return;
        }
        callback(null,results);
    });
}

exports.getUsersCount = function(callback){
    dbutil.users.find({}).count(function(error,result){
        if(error){
            callback(error);
        }
        callback(null,result);
    });
}

//分页查询用户
exports.findUserDividePage = function(skip_size,page_size , callback){
    dbutil.users.find({}).sort({_id:-1})
        .skip(skip_size)
        .limit(page_size)
        .toArray(function(error,results){
           if(error){
               callback(error);
               return;
           }
            callback(null,results);
        });
}



//params : {name:name,age} 多参数查询
exports.findUsers =  function(params,callback){
    dbutil.users.find(params).sort({_id:1})//1 : asc , -1 :des
        .toArray(function(error,results){
            if(error){
                callback(null);
                return;
            }
            callback(null,results);
        });
}

//通过age 区间查询 10<=age<=15 {$and:[{age: {$gte:10}},{age:{$lte:15}}]}
exports.findUsersByAgeRange = function(low,high,callback){
    var params = {$and:[{age:{$gte:low}},{age:{$lte:high}}]};
    console.log(params)
    dbutil.users.find(params).sort({_id:-1})
        .toArray(function(error,results){
            if(error){
                callback(error);
                return;
            }
            callback(null,results);
    });
}

//更新用户数据
exports.updateUserInfo = function(userId,user,callback){

    dbutil.users.update({_id:userId},user,{safe:true},function(error){
        if(error){
            callback(error);
            return;
        }
        callback(null);
    });
}

//删除
exports.deleteUserInfo = function(userId,callback){
    dbutil.users.remove({_id:userId},{safe:true}, function (error) {
        if(error){
            callback(error);
            return;
        }else{
            callback(null);
        }
    });
}
