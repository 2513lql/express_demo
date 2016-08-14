/**
 * Created by LQL on 2016/7/19.
 */
$(document).ready(function(){
    //$('#adduserbtn').onclick=addUser;

    var btn = document.getElementById("adduserbtn");
    btn.onclick = addUser;
});

function addUser(){
    alert("hello");
    $.ajax({
        async:false,
        url:'http://localhost:8080/users/adduser.html',
        data:{'album_name':'new_name','param':'123'},
        type:'post',
        dataType:'json',
        success: function (data) {
            console.log(data);
        },
        error:function(data){
            console.log(data);
        }
    });
}

