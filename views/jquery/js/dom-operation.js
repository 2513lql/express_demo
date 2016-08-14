/**
 * Created by LQL on 2016/7/29.
 */
(function ($) {

    $(function () {
        var $li = $('ul li:eq(1)');
        console.log($li.text());
        console.log("------------------------>");
        var $p = $('p');
        console.log($p.attr('title'));
    });

    $(function () {
        var $li_1 = $('<li title="香蕉">香蕉</li>');
        var $li_2 = $('<li title="葡萄">葡萄</li>');
        var $other = $('<li title="其他">其他</li>');
        var $item = $('ul li:eq(2)');
        var $parent = $('ul');
        $parent.append($li_1);
        $parent.append($other);
        $li_2.insertBefore($item);

        //var $p = $('p');
        //var $b = $('<b>你好</b>');
        //$p.after($b);
        //$p.before($b);
        //$p.prepend($b);
    });

    $(function () {
        var $ul = $('ul').children();
        for (var i = 0, len = $ul.length; i < len; i++) {
            console.log($($ul[i]).html());
        }
    });


    //$(function () {
    //    $("a.tooltip").mouseover(function (e) {
    //        this.myTitle = this.title;
    //        this.title = '';
    //        console.log(this.myTitle);
    //        var tooltip = '<div id="tooltip">' + this.myTitle + '</div>';
    //        $("body").append(tooltip);
    //        $("#tooltip").css({
    //            "background": "#FFFFFF",
    //            "position": "absolute",
    //            "border": "1px solid #ccc",
    //            "top": (e.pageY + 10) + "px",
    //            "left": (e.pageX + 20) + "px"
    //        }).show();
    //    })
    //        .mouseout(function (e) {
    //            this.title = this.myTitle;
    //            $("#tooltip").css({
    //                "top": "-100px"
    //            });
    //        })
    //        .mousemove(function (e) {
    //            $("#tooltip").css({
    //                "top": (e.pageY + 10) + "px",
    //                "left": (e.pageX + 20) + "px"
    //            })
    //        });
    //});


    $(function () {
        var $tooltip = $("#tooltip");
        $("a").mouseover(function (e) {
            this.myTitle = this.title;
            this.title = '';

            $tooltip.text(this.myTitle);
            $tooltip.css({
                "top": (e.pageY + 10) + "px",
                "left": (e.pageX + 20) + "px"
            }).show("fast");
        })
            .mouseout(function () {
                this.title = this.myTitle;
                $tooltip.css({
                    "top": "-100em",
                    "left": "-200em"
                })
            })
            .mousemove(function (e) {
                $tooltip.css({
                    "top": (e.pageY + 10) + "px",
                    "left": (e.pageX + 20) + "px"
                })
            })
    });

    $(function () {
        var $img = $('#imgWrapper');
        var x = 50;
        var y = 50;
        $('.container2 img').mouseover(function (e) {
            var tooltip = '<div id="img_view" class="img-wrapper"><img width="200" height="200" alt="预览" src="'+this.src+'"></div>'
            $("body").append(tooltip);
            $("#tooltip").css({
                "top": (e.pageY) + "px",
                "left": (e.pageX) + "px"
            });
        })
            .mousemove(function(e){
                $("#img_view").css({
                    "top": (e.pageY) + "px",
                    "left": (e.pageX + y) + "px"
                });
            })
            .mouseout(function(){
               $("#img_view").remove();
            })
    });

})(jQuery);