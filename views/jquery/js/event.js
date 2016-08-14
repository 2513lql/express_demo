/**
 * Created by LQL on 2016/8/3.
 */

(function($){
    $(function(){
        $("#panel h5.head").bind('click',function(){
            var $content = $(this).next();
            if($content.is(":visible")){
                $content.hide();
            }else{
                $content.show();
            }
        });

        $("#panel h5.head").hover(function(){
            $(this).next().show(1000);
        },function(){
            $(this).next().hide(1000);
        });
    });

})(jQuery);