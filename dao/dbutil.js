/**
 * Created by LQL on 2016/7/21.
 */
var Db = require("mongodb").Db; //數據庫
var Connection = require("mongodb").Connection;//文檔集合
var Server = require("mongodb").Server;
var async = require("async");
var config = require("../mongodb_config.js");

var host = config.config.db_config.host ? config.config.db_config.host : 'localhost';
//沒有配置端口號 可以使用Connection類獲取服務器監聽的默認端口號
var port = config.config.db_config.port ? config.config.db_config.port : Connection.DEFAULT_PORT;
var poolSize = config.config.db_config.poolSize ? config.config.db_config.poolSize : 10;

//向數據庫構造器傳入{w:1},保證在調用提供給數據庫操作的回調函數之前數據已經成功寫入
var db = new Db('node_test',new Server(host,port,{auto_reconnect:true,poolSize:poolSize}),{w:1});

exports.init=function(callback){
    async.waterfall([
        //open database connection
        function(cb){
            db.open(cb);
            console.log("db.open");
        },
        //創建collection
        function(opened_db,cb){
            db.collection("user",cb);
            console.log("db.collection");
        },
        function(user_coll,cd){
            console.log("user_coll" + (typeof user_coll));
            exports.users=user_coll;
            console.log("exports.users : " + exports.users);
            cd(null);

        }
    ],callback);
}

exports.users=null;
console.log("dbutil exports users: " + exports.users);
