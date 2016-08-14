/**
 * Created by LQL on 2016/7/31.
 */
(function ($) {

    $(function () {

        /*用户名密码输入*/
        var $username = $("#login_username_ipt");
        var $password = $("#login_password_ipt");
        /*删除按钮*/
        var $username_delete_icon = $("#username_delete_icon");
        var $password_delete_icon = $("#password_delete_icon");
        /**/
        var $remember_password = $("#remember_pwd");
        var $login_btn = $("#login_btn");

        $username.keyup(function () {
            var username = $username.val();

            if (username.length > 0) {
                $username_delete_icon.css({
                    "display": "block"
                })
            } else {
                $username_delete_icon.css({
                    "display": "none"
                })
            }
        });
        $password.keyup(function () {
            var password = $password.val();
            if (password.length > 0) {
                $password_delete_icon.css({
                    "display": "block"
                })
            } else {
                $password_delete_icon.css({
                    "display": "none"
                })
            }
        });

        $username_delete_icon.click(function () {
            $username.val('');
            $username_delete_icon.css({
                "display": "none"
            });
        });
        $password_delete_icon.click(function () {
            $password.val('');
            $password_delete_icon.css({
                'display': 'none'
            });
        });

        $login_btn.click(function (e) {
            e.preventDefault();
            var username = $username.val().trim();
            var password = $password.val().trim();
            var $hint_message = $("#hint_message");
            if (username.length == 0) {
                $hint_message.text('用户名不能为空');
                return false;
            } else if (password.length == 0) {
                $hint_message.text('密码不能为空');
                return false;
            } else {
               $("#login_form")[0].submit();
            }
        });
    });

})(jQuery);