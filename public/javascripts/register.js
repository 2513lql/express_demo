/**
 * Created by LQL on 2016/7/30.
 */
(function ($) {

    $(function () {
        $("#userId").blur(function () {

            var userId = $("#userId").val().trim();
            var $userIdHint = $("#userId-hint-wrapper");
            if (userId == "") {
                $userIdHint.html('<span class="icon-false">用户名不能为空</span>');
            } else if (userId.length < 6) {
                $userIdHint.html('<span class="icon-false">用户名不能少于六个字符</span>');
            }
            else {
                $userIdHint.html('');
                $.ajax({
                    async: false,
                    url: '/users/finduser.html',
                    type: 'GET',
                    dataType: 'JSON',
                    data: {userId: userId},
                    success: function (data) {
                        data = JSON.parse(data);
                        if (data.user != null) {
                            $userIdHint.html('<span class="icon-false">该用户名已被注册</span>');
                        } else {
                            $userIdHint.html('<span class="glyphicon glyphicon-ok icon-ok"></span>');
                        }
                    }
                });
            }

        });

        $("#username").blur(function () {
            var username = $("#username").val().trim();
            var $usernameHint = $("#name-hint-wapper");
            if (username == '' || username.length == 0) {
                $usernameHint.html('<span class="icon-false">姓名不能为空</span>');
            } else {
                $usernameHint.html('<span class="glyphicon glyphicon-ok icon-ok"></span>');
            }
        });

        var $password = $("#password");
        var $passwordHint = $("#password-hint-wrapper");
        $("#password").keyup(function () {
            var password = $password.val().trim();
            if (password.length == 0) {
                $passwordHint.val('');
            } else if (password.length > 0 && password.length <= 6) {
                $passwordHint.html('<div id="weak" class="password-hint"></div> ' +
                    '<div id="hint-text" class="password-hint-text">弱</div>');
            } else if (password.length > 6 && password.length <= 12) {
                $passwordHint.html('<div id="weak" class="password-hint">' +
                    '</div><div id="middle" class="password-hint"></div> ' +
                    '<div id="hint-text" class="password-hint-text">中</div>');
            } else {
                $passwordHint.html('<div id="weak" class="password-hint">' +
                    '</div><div id="middle" class="password-hint"></div> ' +
                    '<div id="strong" class="password-hint"></div>' +
                    '<div id="hint-text" class="password-hint-text">强</div>');
            }
        });

        $("#password").blur(function () {
            var password = $password.val().trim();
            if (password == '' || password.length == 0) {
                $passwordHint.html('<span class="icon-false">密码不能为空</span>');
            }
        });

        $("#rePassword").blur(function () {
            var password = $password.val().trim();
            var repassword = $("#rePassword").val().trim();
            var $repasswordhint = $("#rePassword-hint-wrapper");
            if(repassword == ''){
                $repasswordhint.html('<span class="icon-false">密码不能为空</span>');
            } else if (password != repassword) {
                $repasswordhint.html('<span class="icon-false">两次密码不一致</span>');
            } else {
                $repasswordhint.html('<span class="glyphicon glyphicon-ok icon-ok"></span>');
            }
        });

        $("#registerBtn").click(function (e) {
            e.preventDefault();
            var userId = $("#userId").val().trim();
            var username = $("#username").val().trim();
            var password = $("#password").val().trim();
            var repassword = $("#rePassword").val().trim();
            var age = $("#age").val().trim();
            var address = $("#address").val().trim();
            var description = $("#description").val().trim();
            if($("#userId-hint-wrapper span").text() == '该用户名已被注册'){
                return false;
            }
            if(userId.length < 6){
                return false;
            }
            if(username.length == 0){
                return false;
            }
            if(password == 0 || password != repassword){
                return false;
            }

            var data = {
                userId:userId,
                username:username,
                password:password,
                age:age,
                address:address,
                description:description
            }

            $.ajax({
                async:false,
                url:'/users/adduser.html',
                type:'POST',
                data:data,
                dataType:'JSON',
                success: function (data) {
                    data = JSON.parse(data);
                    if(data.message == 'success'){
                        $("#register_message").text('注册成功');
                        $("#userId-hint-wrapper").html('');
                        $("#name-hint-wapper").html('');
                        $("#password-hint-wrapper").html('');
                        $("#rePassword-hint-wrapper").html('');
                        $("#userId").val('');
                        $('#username').val('');
                        $('#password').val('');
                        $('#rePassword').val('');
                        $('#age').val('');
                        $('#address').val('');
                        $('#description').val('');
                    }else{
                        $("#register_message").text('注册失败');
                    }
                }
            })
        });

    });

})(jQuery);