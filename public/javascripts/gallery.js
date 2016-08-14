/**
 * Created by LQL on 2016/8/3.
 */
(function ($) {

    $(function () {
        var img_count = 10;
        var down_limit = -30 - (img_count - 4) * 160;
        var up_limit = -30;
        var $left_btn = $("#left_btn");
        var $right_btn = $("#right_btn");
        var $first_img = $("ul li:eq(0)");
        var swift_width = 160;
        $left_btn.bind('click', function () {
            var marginLeft = getMarginLeft($first_img);
            if (marginLeft > down_limit) {
                marginLeft -= swift_width;
                console.log(marginLeft);
                if (!$first_img.is(":animated")) { //判断$first_img是否处于动画，不处于动画即为其添加一个动画
                    $first_img.animate({"marginLeft": marginLeft + "px"}, "normal");
                }
            }else if(marginLeft == down_limit){
                marginLeft = up_limit;
                if (!$first_img.is(":animated")) { //判断$first_img是否处于动画，不处于动画即为其添加一个动画
                    $first_img.animate({"marginLeft": marginLeft + "px"}, "normal");
                }
            }
        });

        $right_btn.bind('click', function () {

            var marginLeft = Number(getMarginLeft($first_img));
            if (marginLeft < up_limit) {
                marginLeft += swift_width;
                if (!$first_img.is(":animated")) { //判断$first_img是否处于动画，不处于动画即为其添加一个动画
                    $first_img.animate({"marginLeft": marginLeft + "px"}, "normal");
                }
            }else if(marginLeft == up_limit){
                marginLeft = down_limit;
                if (!$first_img.is(":animated")) { //判断$first_img是否处于动画，不处于动画即为其添加一个动画
                    $first_img.animate({"marginLeft": marginLeft + "px"}, "normal");
                }
            }
        });

        function getMarginLeft($first_img) {
            var val = $first_img.css("marginLeft");
            var index = val.indexOf('px');
            var marginLeft = val.substring(0, index);
            return marginLeft;
        }

    });

})(jQuery);