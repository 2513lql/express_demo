/**
 * Created by LQL on 2016/7/23.
 */

//返回错误信息
exports.res_error=function(res,error_code,message){
    res.writeHead(error_code,{"Content-Type":"application/json"});
    var out = {error:error,message:message};
    res.end(JSON.stringify(out));
}

//返回正确结果
exports.res_results = function (res,obj) {
    res.writeHead(200,{"Content-Type":"application/json"});
    var results = {results:obj};
    res.end(JSON.stringify(results));
}